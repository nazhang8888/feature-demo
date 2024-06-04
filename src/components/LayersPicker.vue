<script setup lang="ts">
import { computed, ref } from 'vue';
import { event } from 'quasar';

import { useDataStore } from '@/stores/dataStore';
import { useMapStore } from '@/stores/mapStore';

import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';

defineOptions({
  name: 'LayersPicker',
});

const mapStore = useMapStore();
const dataStore = useDataStore();

const activeIds = ref<number[]>([]);

const dialog = ref<boolean>(false);
const inputModel = ref<string>('');
const inputFillCancelled = ref<boolean>(false);
const { stopAndPrevent } = event;

const fileModel = ref<File | null>(null);

const inputShadowText = computed(() => {
  if (inputFillCancelled.value === true) {
    return '';
  }
  const t = 'New Layer';
  const empty =
    typeof inputModel.value !== 'string' || inputModel.value.length === 0;

  if (empty === true) {
    return t;
  } else if (t.indexOf(inputModel.value) !== 0) {
    return '';
  }

  return t.split(inputModel.value).slice(1).join(inputModel.value);
});

function processInputFill(e: Event) {
  const keyEvent = e as KeyboardEvent;

  if (keyEvent === void 0) {
    return;
  }

  if (keyEvent.key === 'Escape') {
    if (inputFillCancelled.value !== true) {
      inputFillCancelled.value = true;
    }
  } else if (keyEvent.key === 'Tab') {
    if (inputFillCancelled.value !== true && inputShadowText.value.length > 0) {
      stopAndPrevent(e);
      inputModel.value =
        (typeof inputModel.value === 'string' ? inputModel.value : '') +
        inputShadowText.value;
    }
  } else if (inputFillCancelled.value === true) {
    inputFillCancelled.value = false;
  }
}

async function onLayersButtonClick(event: Event): Promise<void> {
  let targetElement = event.target as HTMLElement;
  targetElement = targetElement.closest('.q-btn') as HTMLElement;
  let targetId = parseInt(targetElement.id);
  return new Promise((resolve) => {
    if (activeIds.value.includes(targetId)) {
      activeIds.value = activeIds.value.filter((id) => id !== targetId);
      mapStore.map.getAllLayers().find((layer) => {
        if (layer.get('id') === targetId) {
          mapStore.map.removeLayer(layer);
        }
      });
      resolve();
    } else {
      activeIds.value.push(targetId);
      dataStore.layers.map((layer) => {
        if (layer.id === targetId) {
          let newLayer = new VectorLayer({
            source: new VectorSource({
              features: new GeoJSON({
                featureProjection: 'EPSG:3857',
              }).readFeatures(layer.data),
            }),
            properties: {
              id: layer.id,
              name: layer.name,
            },
          });
          mapStore.map.addLayer(newLayer);
        }
      });
      resolve();
    }
  });
}

function addLayerClick(event: Event) {
  event.preventDefault();
  dialog.value = true;
}

function deleteLayerClick(event: Event, id: number) {
  event.preventDefault();
  dataStore.deleteFeatureCollection(id);
}

function onSubmit(event: Event) {
  event.preventDefault();

  // add loading spinner
  // on load success set dialog to false

  dialog.value = false;

  if (!fileModel.value) {
    return;
  }

  let reader = new FileReader();

  reader.onload = function (e) {
    let result = e.target?.result;
    if (typeof result === 'string') {
      let data = JSON.parse(result);
      dataStore.addFeatureCollection({
        id: dataStore.layers.length,
        name: inputModel.value,
        data: data,
      });
    }
  };

  reader.readAsText(fileModel.value);

  // return (inputModel.value = ''), (fileModel.value = null);
}
</script>

<template>
  <q-btn flat round unelevated icon="layers">
    <q-tooltip>
      <span>Layers</span>
    </q-tooltip>
    <q-menu
      id="layers-menu"
      fit
      transition-show="jump-down"
      transition-hide="jump-up"
      anchor="bottom end"
      :offset="[-45, 20]"
      max-width="250px"
    >
      <q-list class="flex">
        <q-btn
          unelevated
          :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary text-dark'"
          align="between"
          v-for="layer in dataStore.getFeatureCollections"
          :key="layer.id"
          :id="layer.id"
          class="flex col-grow"
          :label="layer.name"
          :icon="
            activeIds.includes(layer.id)
              ? 'radio_button_checked'
              : 'radio_button_unchecked'
          "
          @click="onLayersButtonClick"
        >
          <q-btn
            flat
            dense
            round
            id="delete"
            icon="remove_circle_outline"
            @click="deleteLayerClick($event, layer.id)"
          />
        </q-btn>

        <q-btn
          unelevated
          id="add-layer"
          class="flex col-grow"
          label="Add a new layer.."
          icon="add"
          @click="addLayerClick"
        />

        <q-dialog v-model="dialog" backdrop-filter="grayscale(100%)">
          <q-card :color="$q.dark.isActive ? 'dark' : 'primary'">
            <q-card-section class="row items-center q-pb-none text-h6">
              Add a New Layer
            </q-card-section>
            <q-form @submit="onSubmit($event)" autofocus>
              <q-card-section>
                <q-input
                  v-model="inputModel"
                  filled
                  clearable
                  color="purple-12"
                  label="Enter a name for your layer"
                  :shadow-text="inputShadowText"
                  @keydown="processInputFill"
                  @focus="processInputFill"
                  :rules="[(val) => !!val || 'Required']"
                />
              </q-card-section>
              <q-card-section>
                <q-file
                  id="file-upload"
                  filled
                  counter
                  color="purple-12"
                  accept=".json"
                  label="Upload a GeoJSON file"
                  use-chips
                  v-model="fileModel"
                  style="min-width: 300px"
                  :rules="[(val) => !!val || 'Required']"
                >
                  <template v-slot:append>
                    <q-icon name="add" />
                  </template>
                </q-file>
              </q-card-section>

              <q-card-section align="right">
                <q-btn label="Upload" type="submit" />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  style="display: none"
                  flat
                  label="Close"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-btn
          style="display: none"
          flat
          label="Close"
          color="primary"
          v-close-popup
        />
      </q-list>
    </q-menu>
  </q-btn>
</template>
