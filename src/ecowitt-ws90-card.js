const CARD_VERSION = "0.1.4";

const FIELD_DEFINITIONS = [
  {
    id: "conditions",
    title: "Vejrdata",
    fields: [
      { key: "temperature", label: "Temperatur", icon: "mdi:thermometer", suffixes: ["temperature", "outdoor_temperature", "temp", "temperatur"] },
      { key: "humidity", label: "Luftfugtighed", icon: "mdi:water-percent", suffixes: ["humidity", "outdoor_humidity", "luftfugtighed"] },
      { key: "dew_point", label: "Dugpunkt", icon: "mdi:water-thermometer", suffixes: ["dew_point", "dewpoint", "dugpunkt"] },
      { key: "pressure", label: "Lufttryk", icon: "mdi:gauge", suffixes: ["pressure", "air_pressure", "barometric_pressure", "relative_pressure", "lufttryk"] },
      { key: "wetness", label: "Fugtighed", icon: "mdi:water-off", suffixes: ["wetness", "moisture", "rain_state", "fugtighed"] }
    ]
  },
  {
    id: "wind",
    title: "Vind",
    fields: [
      { key: "wind_speed", label: "Vindhastighed", icon: "mdi:weather-windy", suffixes: ["wind_speed", "speed", "hastighed"] },
      { key: "wind_gust", label: "Vindstød", icon: "mdi:weather-dust", suffixes: ["wind_gust", "wind_gust_speed", "gust", "gust_speed", "hastighed_2"] },
      { key: "wind_bearing", label: "Direction", icon: "mdi:eye", suffixes: ["direction", "wind_direction", "wind_bearing", "wind_direction_degrees", "retning"] }
    ]
  },
  {
    id: "rain",
    title: "Regn",
    fields: [
      { key: "rain", label: "Nedbør", icon: "mdi:weather-rainy", suffixes: ["rain", "rainfall", "precipitation", "total_rain", "rain_total", "nedbor", "nedbør"] }
    ]
  },
  {
    id: "sun",
    title: "Sol",
    fields: [
      { key: "uv_index", label: "UV index", icon: "mdi:sun-wireless-outline", suffixes: ["uv_index", "uvi", "uv"] },
      { key: "illuminance", label: "Belysningsstyrke", icon: "mdi:brightness-5", suffixes: ["illuminance", "light", "belysningsstyrke"] }
    ]
  }
];

const DEFAULT_SECTION_ORDER = ["conditions", "wind", "rain", "sun"];
const SUMMARY_FIELD_KEYS = new Set([
  "temperature",
  "humidity",
  "dew_point",
  "pressure",
  "wetness",
  "wind_speed",
  "wind_gust",
  "wind_bearing",
  "rain",
  "illuminance",
  "uv_index"
]);
const WETNESS_ICONS = {
  dry: "mdi:water-off",
  wet: "mdi:water-check",
  rain: "mdi:weather-rainy",
  rainy: "mdi:weather-rainy"
};
const WETNESS_LABELS = {
  dry: "Tørt",
  wet: "Vådt",
  rain: "Regn",
  rainy: "Regn"
};
const GRAPHIC_LABELS = {
  "clear-night": "Klar nat",
  cloudy: "Overskyet",
  exceptional: "Ekstremt vejr",
  fog: "Tåge",
  hail: "Hagl",
  lightning: "Lyn",
  "lightning-rainy": "Tordenregn",
  partlycloudy: "Delvist skyet",
  pouring: "Kraftig regn",
  rainy: "Regn",
  snowy: "Sne",
  "snowy-rainy": "Slud",
  sunny: "Sol",
  windy: "Blæsende",
  "windy-variant": "Blæsende"
};
const WEATHER_ICONS = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant"
};
const WEATHER_ICON_LAYERS = {
  "clear-night": [
    { icon: "mdi:weather-night", className: "layer-main layer-moon" }
  ],
  cloudy: [
    { icon: "mdi:weather-cloudy", className: "layer-main layer-cloud" }
  ],
  exceptional: [
    { icon: "mdi:alert-circle-outline", className: "layer-main layer-alert" }
  ],
  fog: [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-fog-cloud" },
    { icon: "mdi:weather-fog", className: "layer-main layer-fog" }
  ],
  hail: [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-top-cloud" },
    { icon: "mdi:weather-hail", className: "layer-main layer-rain" }
  ],
  lightning: [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-top-cloud" },
    { icon: "mdi:weather-lightning", className: "layer-main layer-lightning" }
  ],
  "lightning-rainy": [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-top-cloud" },
    { icon: "mdi:weather-lightning-rainy", className: "layer-main layer-lightning" }
  ],
  partlycloudy: [
    { icon: "mdi:weather-sunny", className: "layer-sun layer-back-sun" },
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-front-cloud" }
  ],
  pouring: [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-top-cloud" },
    { icon: "mdi:weather-pouring", className: "layer-main layer-rain" }
  ],
  rainy: [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-top-cloud" },
    { icon: "mdi:weather-rainy", className: "layer-main layer-rain" }
  ],
  snowy: [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-top-cloud" },
    { icon: "mdi:weather-snowy", className: "layer-main layer-snow" }
  ],
  "snowy-rainy": [
    { icon: "mdi:weather-cloudy", className: "layer-cloud layer-top-cloud" },
    { icon: "mdi:weather-snowy-rainy", className: "layer-main layer-snow" }
  ],
  sunny: [
    { icon: "mdi:weather-sunny", className: "layer-main layer-sun" }
  ],
  windy: [
    { icon: "mdi:weather-windy", className: "layer-main layer-wind" }
  ],
  "windy-variant": [
    { icon: "mdi:weather-windy-variant", className: "layer-main layer-wind" }
  ]
};
const AI_PROVIDERS = {
  home_assistant: "Home Assistant Assist",
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google Gemini",
  ollama: "Ollama",
  custom: "Custom"
};
const CONFIG_LABELS = {
  title: "Titel",
  station_name: "Stationsnavn",
  entity_prefix: "Entity prefix",
  scale: "Skalering",
  show_missing: "Vis manglende sensorer",
  compact: "Kompakt layout",
  show_weather_description: "Vis vejrbeskrivelse",
  show_metric_icons: "Vis sæsonstatus",
  weather_entity: "Vejr entity",
  show_ai_summary: "Vis AI summary",
  ai_provider: "AI til tolkning",
  ai_summary_entity: "AI summary entity",
  temperature: "Temperatur",
  dew_point: "Dew point",
  wind_bearing: "Direction",
  wetness: "Fugtighed",
  wind_speed: "Hastighed",
  wind_gust: "Hastighed / vindstød",
  humidity: "Luftfugtighed",
  pressure: "Lufttryk",
  rain: "Nedbør",
  uv_index: "UV Index",
  illuminance: "Belysningsstyrke"
};
const CONFIG_HELPERS = {
  entity_prefix: "Valgfrit. Bruges kun hvis du ikke vælger entities manuelt.",
  scale: "Finjusterer auto-skaleringen. 1 er normal størrelse.",
  wind_speed: "Vælg den normale hastighedssensor. Bruges også til Beaufort.",
  wind_gust: "Vælg den anden hastighedssensor, hvis den repræsenterer vindstød.",
  wind_bearing: "Vælg Direction-sensoren i grader. Kortet beregner kompasretningen ud fra denne.",
  show_metric_icons: "Vis grøn normalmarkering eller røde op/ned-pile i forhold til årstidens normalområde.",
  weather_entity: "Valgfrit. Hvis valgt, styrer denne weather entity vejrbeskrivelsen og det animerede ikon.",
  ai_provider: "Valget gemmes i kortets config, så en automation kan vide hvilken AI der tolker data.",
  ai_summary_entity: "Vælg en entity som indeholder AI-teksten, fx en sensor eller input_text opdateret af en automation."
};
const ENTITY_CONFIG_SCHEMA = [
  { name: "temperature", selector: { entity: { domain: "sensor" } } },
  { name: "dew_point", selector: { entity: { domain: "sensor" } } },
  { name: "wind_bearing", selector: { entity: { domain: "sensor" } } },
  { name: "wetness", selector: { entity: { domain: "sensor" } } },
  { name: "wind_speed", selector: { entity: { domain: "sensor" } } },
  { name: "wind_gust", selector: { entity: { domain: "sensor" } } },
  { name: "humidity", selector: { entity: { domain: "sensor" } } },
  { name: "pressure", selector: { entity: { domain: "sensor" } } },
  { name: "rain", selector: { entity: { domain: "sensor" } } },
  { name: "uv_index", selector: { entity: { domain: "sensor" } } },
  { name: "illuminance", selector: { entity: { domain: "sensor" } } }
];
const AI_PROVIDER_OPTIONS = Object.entries(AI_PROVIDERS).map(([value, label]) => ({ value, label }));
const BEAUFORT_SCALE = [
  { score: 0, max: 0.5, name: "Stille" },
  { score: 1, max: 1.6, name: "Næsten stille" },
  { score: 2, max: 3.4, name: "Svag vind" },
  { score: 3, max: 5.5, name: "Let vind" },
  { score: 4, max: 8.0, name: "Jævn vind" },
  { score: 5, max: 10.8, name: "Frisk vind" },
  { score: 6, max: 13.9, name: "Hård vind" },
  { score: 7, max: 17.2, name: "Stiv kuling" },
  { score: 8, max: 20.8, name: "Hård kuling" },
  { score: 9, max: 24.5, name: "Stormende kuling" },
  { score: 10, max: 28.5, name: "Storm" },
  { score: 11, max: 32.7, name: "Stærk storm" },
  { score: 12, max: Infinity, name: "Orkan" }
];
const SEASON_LABELS = {
  winter: "Vinter",
  spring: "Forår",
  summer: "Sommer",
  autumn: "Efterår"
};
const METRIC_STATUS_LABELS = {
  dew_point: "Dugpunkt",
  pressure: "Lufttryk",
  rain: "Nedbør",
  uv_index: "UV",
  illuminance: "Belysningsstyrke",
  rain_chance: "Regnchance"
};
const METRIC_STATUS_TEXT = {
  normal: "inden for årstidens normalområde",
  high: "højere end årstidens normalområde",
  low: "lavere end årstidens normalområde"
};
const SEASONAL_METRIC_RANGES = {
  dew_point: {
    winter: { min: -3, max: 3, unit: "°C" },
    spring: { min: 2, max: 8, unit: "°C" },
    summer: { min: 8, max: 14, unit: "°C" },
    autumn: { min: 4, max: 10, unit: "°C" }
  },
  pressure: {
    winter: { min: 1015, max: 1025, unit: "hPa" },
    spring: { min: 1015, max: 1025, unit: "hPa" },
    summer: { min: 1013, max: 1023, unit: "hPa" },
    autumn: { min: 1015, max: 1025, unit: "hPa" }
  },
  rain: {
    winter: { min: 0, max: 0, unit: "mm" },
    spring: { min: 0, max: 0, unit: "mm" },
    summer: { min: 0, max: 0, unit: "mm" },
    autumn: { min: 0, max: 0, unit: "mm" }
  },
  uv_index: {
    winter: { min: 0, max: 1, unit: "" },
    spring: { min: 1, max: 4, unit: "" },
    summer: { min: 2, max: 6, unit: "" },
    autumn: { min: 0, max: 3, unit: "" }
  },
  illuminance: {
    winter: { min: 1000, max: 15000, unit: "lx" },
    spring: { min: 8000, max: 45000, unit: "lx" },
    summer: { min: 15000, max: 75000, unit: "lx" },
    autumn: { min: 3000, max: 30000, unit: "lx" }
  },
  rain_chance: {
    winter: { min: 0, max: 25, unit: "%" },
    spring: { min: 0, max: 25, unit: "%" },
    summer: { min: 0, max: 20, unit: "%" },
    autumn: { min: 0, max: 30, unit: "%" }
  }
};
const CARD_TAG = "ecowitt-ws90-card";
const LEGACY_SHOW_WEATHER_KEY = ["show", "pira", "teweather", "_graphic"].join("");
const LEGACY_WEATHER_ENTITY_KEY = ["pira", "teweather", "_entity"].join("");

class EcowittWs90Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = undefined;
    this._contextUnsubscribe = undefined;
    this._renderQueued = false;
  }

  connectedCallback() {
    this._requestHassContext();
    this._render();
  }

  disconnectedCallback() {
    if (typeof this._contextUnsubscribe === "function") {
      this._contextUnsubscribe();
      this._contextUnsubscribe = undefined;
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._queueRender();
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    const normalizedConfig = { ...config };

    if (normalizedConfig.show_weather_description === undefined && config[LEGACY_SHOW_WEATHER_KEY] !== undefined) {
      normalizedConfig.show_weather_description = config[LEGACY_SHOW_WEATHER_KEY];
    }

    if (!normalizedConfig.weather_entity && config[LEGACY_WEATHER_ENTITY_KEY]) {
      normalizedConfig.weather_entity = config[LEGACY_WEATHER_ENTITY_KEY];
    }

    this._config = {
      title: "Ecowitt WS-90",
      station_name: "Weather station",
      show_missing: false,
      compact: false,
      sections: DEFAULT_SECTION_ORDER,
      entities: {},
      extra_entities: [],
      entity_prefix: "",
      scale: 1,
      show_weather_description: false,
      show_metric_icons: true,
      weather_entity: "",
      show_ai_summary: false,
      ai_provider: "home_assistant",
      ai_summary_entity: "",
      ...normalizedConfig
    };

    if (this.isConnected) {
      this._requestHassContext();
    }

    this._render();
  }

  getCardSize() {
    return this._config.compact ? 4 : 6;
  }

  getGridOptions() {
    return {
      rows: this._config.compact ? 4 : 6,
      columns: 12,
      min_rows: 3,
      min_columns: 6
    };
  }

  static getStubConfig() {
    return {
      title: "Ecowitt WS-90",
      station_name: "Weather station",
      show_missing: false,
      entities: {
        temperature: "sensor.ws90_temperature",
        dew_point: "sensor.ws90_dew_point",
        humidity: "sensor.ws90_humidity",
        pressure: "sensor.ws90_pressure",
        wetness: "sensor.ws90_wetness",
        wind_speed: "sensor.ws90_wind_speed",
        wind_gust: "sensor.ws90_wind_gust",
        wind_bearing: "sensor.ws90_direction",
        rain: "sensor.ws90_rain",
        illuminance: "sensor.ws90_illuminance",
        uv_index: "sensor.ws90_uv_index"
      }
    };
  }

  _requestHassContext() {
    if (this._contextUnsubscribe) {
      return;
    }

    const event = new CustomEvent("context-request", {
      bubbles: true,
      composed: true,
      cancelable: true
    });

    event.context = "states";
    event.subscribe = true;
    event.callback = (states, unsubscribe) => {
      if (typeof unsubscribe === "function") {
        this._contextUnsubscribe = unsubscribe;
      }

      if (states) {
        this._hass = {
          ...(this._hass || {}),
          states
        };
        this._queueRender();
      }
    };

    this.dispatchEvent(event);
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "station_name", selector: { text: {} } },
        {
          type: "expandable",
          name: "",
          title: "Ekstra visning",
          flatten: true,
          schema: [
            {
              type: "grid",
              name: "",
              flatten: true,
              column_min_width: "220px",
              schema: [
                { name: "show_weather_description", selector: { boolean: {} } },
                { name: "show_metric_icons", selector: { boolean: {} } },
                { name: "weather_entity", selector: { entity: { domain: "weather" } } },
                { name: "show_ai_summary", selector: { boolean: {} } },
                {
                  name: "ai_provider",
                  selector: {
                    select: {
                      mode: "dropdown",
                      options: AI_PROVIDER_OPTIONS
                    }
                  }
                },
                { name: "ai_summary_entity", selector: { entity: {} } }
              ]
            }
          ]
        },
        {
          type: "expandable",
          name: "entities",
          title: "WS-90 entities",
          schema: [
            {
              type: "grid",
              name: "",
              flatten: true,
              column_min_width: "220px",
              schema: ENTITY_CONFIG_SCHEMA
            }
          ]
        },
        {
          name: "scale",
          selector: {
            number: {
              min: 0.5,
              max: 1.2,
              step: 0.05,
              mode: "slider"
            }
          }
        },
        { name: "entity_prefix", selector: { text: {} } },
        {
          type: "grid",
          name: "",
          flatten: true,
          schema: [
            { name: "show_missing", selector: { boolean: {} } },
            { name: "compact", selector: { boolean: {} } }
          ]
        }
      ],
      computeLabel: (schema) => CONFIG_LABELS[schema.name],
      computeHelper: (schema) => CONFIG_HELPERS[schema.name],
      assertConfig: (config) => {
        if (config.entities !== undefined && (typeof config.entities !== "object" || Array.isArray(config.entities))) {
          throw new Error("'entities' must be an object.");
        }
      }
    };
  }

  _queueRender() {
    if (this._renderQueued) {
      return;
    }

    this._renderQueued = true;
    requestAnimationFrame(() => {
      this._renderQueued = false;
      this._render();
    });
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }

    const hass = this._hass;
    const sections = this._getSections();
    const summary = this._getSummaryFields();
    const wetness = this._getWetnessSummary();
    const beaufort = beaufortFromState(summary.wind_speed.state);
    const windDirection = this._getWindDirectionSummary();
    const windRotation = this._getWindRotation();
    const weatherDescription = this._getWeatherDescription(summary, wetness);
    const rainChance = this._getRainChance(summary);
    const aiSummary = this._getAiSummary(summary, wetness, beaufort, windDirection);
    const scale = this._getScale();

    this.shadowRoot.innerHTML = `
      <style>${this._styles()}</style>
      <ha-card>
        <div class="card ${this._config.compact ? "compact" : ""}" style="--manual-scale:${scale};">
          <header class="header">
            <div>
              <h2>${escapeHtml(this._config.title)}</h2>
              <p>${escapeHtml(this._config.station_name)}</p>
            </div>
          </header>

          ${!hass ? this._renderEmptyState("Waiting for Home Assistant data") : ""}

          ${hass ? `
            ${this._config.show_weather_description ? this._renderWeatherDescription(weatherDescription) : ""}

            <section class="summary">
              <button class="weather-current" ${entityDataAttr(wetness.entityId)}>
                <div class="weather-icon-row">
                  <ha-icon class="weather-icon" icon="${escapeHtml(wetness.icon)}"></ha-icon>
                  <span>Fugtighed</span>
                  <strong>${escapeHtml(wetness.value)}</strong>
                </div>
                <div class="temperature">
                  <span class="label">Nu</span>
                  <strong>${summary.temperature.value}</strong>
                  <small>${summary.humidity.value !== "—" ? `Luftfugtighed ${summary.humidity.value}` : "Luftfugtighed —"}</small>
                </div>
              </button>

              <div class="wind-summary">
                <button class="wind-dial" ${entityDataAttr(windDirection.entityId)} style="--rotation:${windRotation}deg" aria-label="Wind direction">
                  <div class="dial-ring">
                    <ha-icon icon="mdi:navigation"></ha-icon>
                  </div>
                  <span>${escapeHtml(windDirection.value)}</span>
                </button>
                <div class="wind-values">
                  ${this._renderWindMetric("Vind", summary.wind_speed, beaufort)}
                  ${this._renderWindMetric("Stød", summary.wind_gust)}
                </div>
              </div>
            </section>

            <div class="quick-grid">
              ${this._renderSummaryItem("Dugpunkt", summary.dew_point, "dew_point")}
              ${this._renderSummaryItem("Lufttryk", summary.pressure, "pressure")}
              ${this._renderSummaryItem("Nedbør", summary.rain, "rain")}
              ${this._renderSummaryItem("UV", summary.uv_index, "uv_index")}
              ${this._renderSummaryItem("Belysningsstyrke", summary.illuminance, "illuminance")}
              ${this._renderSummaryItem("Regnchance", rainChance, "rain_chance")}
            </div>

            <div class="sections">
              ${sections.map((section) => this._renderSection(section)).join("")}
              ${this._renderExtraEntities()}
            </div>

            ${this._config.show_ai_summary ? this._renderAiSummary(aiSummary) : ""}
          ` : ""}
        </div>
      </ha-card>
    `;
  }

  _getSections() {
    const sectionIds = Array.isArray(this._config.sections)
      ? this._config.sections
      : DEFAULT_SECTION_ORDER;

    return sectionIds
      .map((id) => FIELD_DEFINITIONS.find((section) => section.id === id))
      .filter(Boolean)
      .map((section) => ({
        ...section,
        fields: section.fields
          .filter((field) => !SUMMARY_FIELD_KEYS.has(field.key))
          .map((field) => ({ ...field, state: this._resolveField(field) }))
          .filter((field) => this._config.show_missing || field.state)
      }))
      .filter((section) => this._config.show_missing || section.fields.length > 0);
  }

  _resolveField(field) {
    const entityId = this._config.entities?.[field.key] || this._inferEntityId(field);
    return this._getEntityState(entityId);
  }

  _inferEntityId(field) {
    const prefix = this._config.entity_prefix;

    if (!prefix) {
      return "";
    }

    const normalizedPrefix = prefix.startsWith("sensor.") ? prefix : `sensor.${prefix}`;
    const candidates = [field.key, ...(field.suffixes || [])];

    for (const suffix of candidates) {
      const entityId = `${normalizedPrefix}_${suffix}`;
      if (this._hass?.states?.[entityId]) {
        return entityId;
      }
    }

    return `${normalizedPrefix}_${field.key}`;
  }

  _getEntityState(entityId) {
    if (!entityId || !this._hass?.states) {
      return undefined;
    }

    const state = this._hass.states[entityId];

    if (!state) {
      return undefined;
    }

    return state.entity_id === entityId ? state : { ...state, entity_id: entityId };
  }

  _getSummaryFields() {
    return {
      temperature: this._formatField("temperature"),
      humidity: this._formatField("humidity"),
      dew_point: this._formatField("dew_point"),
      pressure: this._formatField("pressure"),
      wetness: this._formatField("wetness"),
      wind_speed: this._formatField("wind_speed"),
      wind_gust: this._formatField("wind_gust"),
      wind_bearing: this._formatField("wind_bearing"),
      rain: this._formatField("rain"),
      illuminance: this._formatField("illuminance"),
      uv_index: this._formatField("uv_index")
    };
  }

  _formatField(fieldKey) {
    const field = FIELD_DEFINITIONS
      .flatMap((section) => section.fields)
      .find((candidate) => candidate.key === fieldKey);
    const state = field ? this._resolveField(field) : undefined;

    if (!state) {
      return { value: "—", entityId: undefined };
    }

    return {
      value: formatState(state),
      entityId: state.entity_id,
      state
    };
  }

  _getWetnessSummary() {
    const wetness = this._formatField("wetness");
    const raw = String(wetness.state?.state || "").trim().toLowerCase();

    if (!wetness.state) {
      return {
        icon: "mdi:water-off",
        value: "—",
        entityId: wetness.entityId
      };
    }

    return {
      icon: wetness.state.attributes?.icon || WETNESS_ICONS[raw] || "mdi:water-percent",
      value: WETNESS_LABELS[raw] || wetness.value,
      entityId: wetness.entityId
    };
  }

  _getWindDirectionSummary() {
    const bearing = this._formatField("wind_bearing");
    const degrees = numberFromState(bearing.state);

    if (Number.isFinite(degrees)) {
      return {
        entityId: bearing.entityId,
        value: `${degreesToCompass(degrees)} ${formatState(bearing.state)}`
      };
    }

    return bearing;
  }

  _getWindRotation() {
    const bearing = this._formatField("wind_bearing");
    const numericBearing = numberFromState(bearing.state);

    if (Number.isFinite(numericBearing)) {
      return numericBearing;
    }

    return compassToDegrees(bearing.value);
  }

  _getWeatherDescription(summary, wetness) {
    const configuredState = this._getEntityState(this._config.weather_entity);
    const rawState = String(configuredState?.state || "").trim().toLowerCase();
    const wetnessState = String(wetness.state?.state || "").trim().toLowerCase();
    const uv = numberFromState(summary.uv_index.state);
    const illuminance = numberFromState(summary.illuminance.state);
    const windSpeed = windSpeedToMetersPerSecond(numberFromState(summary.wind_speed.state), summary.wind_speed.state?.attributes?.unit_of_measurement);
    let condition = normalizeWeatherCondition(rawState);

    if (!condition) {
      if (["wet", "rain", "rainy"].includes(wetnessState)) {
        condition = "rainy";
      } else if (Number.isFinite(windSpeed) && windSpeed >= 8) {
        condition = "windy";
      } else if ((Number.isFinite(uv) && uv > 0) || (Number.isFinite(illuminance) && illuminance > 12000)) {
        condition = "sunny";
      } else {
        condition = "partlycloudy";
      }
    }

    return {
      condition,
      icon: WEATHER_ICONS[condition] || "mdi:weather-partly-cloudy",
      entityId: configuredState?.entity_id,
      label: GRAPHIC_LABELS[condition] || sentenceCase(condition)
    };
  }

  _getRainChance(summary) {
    const chance = rainChanceFromSummary(summary);

    if (!Number.isFinite(chance)) {
      return {
        value: "—",
        entityId: undefined,
        state: undefined
      };
    }

    return {
      value: `${chance} %`,
      entityId: undefined,
      state: {
        state: String(chance),
        attributes: {
          unit_of_measurement: "%"
        }
      }
    };
  }

  _getAiSummary(summary, wetness, beaufort, windDirection) {
    const provider = AI_PROVIDERS[this._config.ai_provider] || AI_PROVIDERS.home_assistant;
    const entity = this._getEntityState(this._config.ai_summary_entity);
    const entityText = getSummaryText(entity);

    if (entityText) {
      return {
        entityId: entity.entity_id,
        provider,
        text: entityText
      };
    }

    return {
      entityId: undefined,
      provider,
      text: this._buildFallbackSummary(summary, wetness, beaufort, windDirection),
      fallback: true
    };
  }

  _buildFallbackSummary(summary, wetness, beaufort, windDirection) {
    const parts = [
      `Temperatur ${summary.temperature.value}`,
      `luftfugtighed ${summary.humidity.value}`,
      `vind ${summary.wind_speed.value}`
    ];

    if (beaufort) {
      parts.push(`Bft ${beaufort.score} (${beaufort.name})`);
    }

    if (windDirection?.value && windDirection.value !== "—") {
      parts.push(`retning ${windDirection.value}`);
    }

    if (wetness?.value && wetness.value !== "—") {
      parts.push(`overflade ${wetness.value.toLowerCase()}`);
    }

    return `${parts.join(", ")}. Vælg en AI summary entity i kortets UI, hvis teksten skal komme fra ${AI_PROVIDERS[this._config.ai_provider] || "din valgte AI"}.`;
  }

  _renderSummaryItem(label, field, metricKey) {
    if (!field?.state && !this._config.show_missing) {
      return "";
    }

    const indicator = this._config.show_metric_icons === false || !metricKey
      ? undefined
      : metricIndicatorFor(metricKey, field);

    return `
      <button class="summary-item ${indicator ? "has-indicator" : ""}" ${entityDataAttr(field.entityId)}>
        <span class="summary-copy">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(field.value)}</strong>
        </span>
        ${indicator ? this._renderMetricIndicator(indicator) : ""}
      </button>
    `;
  }

  _getScale() {
    const scale = Number.parseFloat(this._config.scale);

    if (!Number.isFinite(scale)) {
      return 1;
    }

    return Math.min(1.2, Math.max(0.5, scale));
  }

  _renderWeatherDescription(graphic) {
    const conditionClass = `condition-${escapeHtml(graphic.condition)}`;

    return `
      <button class="weather-description ${conditionClass}" ${entityDataAttr(graphic.entityId)}>
        <div class="ha-weather-animation" aria-hidden="true">
          ${this._renderWeatherSvg(graphic.condition)}
        </div>
        <div class="weather-description-copy">
          <span>Vejrbeskrivelse</span>
          <strong>${escapeHtml(graphic.label)}</strong>
        </div>
      </button>
    `;
  }

  _renderWeatherSvg(condition) {
    const normalized = normalizeWeatherCondition(condition) || condition || "partlycloudy";

    if (normalized === "sunny") {
      return `
        <svg class="weather-svg weather-svg-sunny" viewBox="0 0 96 96" aria-hidden="true">
          <g class="weather-sun-rays" stroke="#ffd739" stroke-width="5" stroke-linecap="round">
            <path d="M48 6v13M48 77v13M6 48h13M77 48h13M18 18l9 9M69 69l9 9M78 18l-9 9M27 69l-9 9"/>
          </g>
          <circle class="weather-sun-core" cx="48" cy="48" r="24" fill="#ffd739"/>
        </svg>
      `;
    }

    if (normalized === "clear-night") {
      return `
        <svg class="weather-svg weather-svg-night" viewBox="0 0 96 96" aria-hidden="true">
          <path class="weather-moon" d="M62 14a34 34 0 1 0 18 54A30 30 0 1 1 62 14Z" fill="#7c4dff"/>
          <circle cx="30" cy="22" r="3" fill="#d9ccff"/>
          <circle cx="73" cy="35" r="2.5" fill="#d9ccff"/>
        </svg>
      `;
    }

    if (normalized === "partlycloudy") {
      return `
        <svg class="weather-svg weather-svg-partlycloudy" viewBox="0 0 96 96" aria-hidden="true">
          <circle class="weather-sun-core" cx="62" cy="30" r="22" fill="#ffd739"/>
          <g class="weather-cloud">
            <circle cx="34" cy="56" r="20" fill="#d4d6d8"/>
            <circle cx="55" cy="50" r="25" fill="#cfd2d4"/>
            <circle cx="72" cy="60" r="18" fill="#c9cccf"/>
            <rect x="24" y="54" width="60" height="26" rx="13" fill="#cfd2d4"/>
            <circle cx="35" cy="66" r="18" fill="#f7f8f8"/>
            <rect x="18" y="64" width="45" height="18" rx="9" fill="#f7f8f8"/>
          </g>
        </svg>
      `;
    }

    const hasRain = ["rainy", "pouring", "lightning-rainy", "snowy-rainy", "hail"].includes(normalized);
    const hasSnow = ["snowy", "snowy-rainy"].includes(normalized);
    const hasLightning = ["lightning", "lightning-rainy", "exceptional"].includes(normalized);
    const isFog = normalized === "fog";
    const isWindy = ["windy", "windy-variant"].includes(normalized);

    return `
      <svg class="weather-svg weather-svg-${escapeHtml(normalized)}" viewBox="0 0 96 96" aria-hidden="true">
        <g class="weather-cloud">
          <circle cx="32" cy="48" r="20" fill="#d8dadc"/>
          <circle cx="54" cy="40" r="26" fill="#d1d4d6"/>
          <circle cx="72" cy="54" r="19" fill="#c8ccd0"/>
          <rect x="18" y="50" width="66" height="29" rx="15" fill="#cfd2d4"/>
          ${normalized === "cloudy" ? '<circle cx="35" cy="65" r="17" fill="#f5f6f7"/><rect x="22" y="63" width="45" height="17" rx="9" fill="#f5f6f7"/>' : ""}
        </g>
        ${hasRain ? `
          <g class="weather-rain">
            <path d="M34 78l-5 10" stroke="#1976d2" stroke-width="5" stroke-linecap="round"/>
            <path d="M51 78l-5 10" stroke="#1976d2" stroke-width="5" stroke-linecap="round"/>
            <path d="M68 78l-5 10" stroke="#1976d2" stroke-width="5" stroke-linecap="round"/>
          </g>
        ` : ""}
        ${hasSnow ? `
          <g class="weather-snow" fill="#56b5e8">
            <circle cx="34" cy="84" r="4"/>
            <circle cx="52" cy="88" r="4"/>
            <circle cx="70" cy="82" r="4"/>
          </g>
        ` : ""}
        ${hasLightning ? '<path class="weather-lightning" d="M56 55 42 80h12l-5 15 18-25H55l8-15Z" fill="#f9a825"/>' : ""}
        ${isFog ? `
          <g class="weather-fog" stroke="#90a4ae" stroke-width="5" stroke-linecap="round">
            <path d="M22 77h52"/>
            <path d="M30 88h42"/>
          </g>
        ` : ""}
        ${isWindy ? `
          <g class="weather-wind" stroke="#00838f" stroke-width="6" stroke-linecap="round" fill="none">
            <path d="M17 45h44c12 0 12-16 0-16"/>
            <path d="M24 60h53"/>
            <path d="M17 74h38c10 0 10 13 0 13"/>
          </g>
        ` : ""}
      </svg>
    `;
  }

  _renderWeatherIconLayers(condition) {
    const layers = WEATHER_ICON_LAYERS[condition] || [
      { icon: WEATHER_ICONS[condition] || "mdi:weather-partly-cloudy", className: "layer-main layer-cloud" }
    ];

    return layers
      .map((layer) => `<ha-icon class="weather-icon-layer ${escapeHtml(layer.className)}" icon="${escapeHtml(layer.icon)}"></ha-icon>`)
      .join("");
  }

  _renderMetricIndicator(indicator) {
    return `
      <span class="metric-status metric-status-${escapeHtml(indicator.status)}" title="${escapeHtml(indicator.label)}" aria-label="${escapeHtml(indicator.label)}">
        <span class="status-arrow status-arrow-high" aria-hidden="true">↑</span>
        <span class="status-normal" aria-hidden="true"></span>
        <span class="status-arrow status-arrow-low" aria-hidden="true">↓</span>
      </span>
    `;
  }

  _renderAiSummary(summary) {
    return `
      <section class="ai-summary ${summary.fallback ? "is-fallback" : ""}" ${entityDataAttr(summary.entityId)}>
        <p>${escapeHtml(summary.text)}</p>
      </section>
    `;
  }

  _renderWindMetric(label, field, beaufort) {
    const forceClass = beaufort?.name?.length > 10 ? " is-long" : "";

    return `
      <button class="wind-metric" ${entityDataAttr(field.entityId)}>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(field.value)}</strong>
        ${beaufort ? `
          <span class="wind-force${forceClass}">
            <small>Bft ${beaufort.score}</small>
            <b>${escapeHtml(beaufort.name)}</b>
          </span>
        ` : ""}
      </button>
    `;
  }

  _renderSection(section) {
    return `
      <section class="section">
        <h3>${escapeHtml(section.title)}</h3>
        <div class="field-grid">
          ${section.fields.map((field) => this._renderField(field)).join("")}
        </div>
      </section>
    `;
  }

  _renderField(field) {
    const value = field.state ? formatState(field.state) : "Missing";
    const entityId = field.state?.entity_id || this._config.entities?.[field.key] || "";
    const missingClass = field.state ? "" : " missing";

    return `
      <button class="field${missingClass}" data-entity-id="${escapeHtml(entityId)}">
        <ha-icon icon="${escapeHtml(field.icon)}"></ha-icon>
        <span class="field-label">${escapeHtml(field.label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </button>
    `;
  }

  _renderExtraEntities() {
    const extraEntities = Array.isArray(this._config.extra_entities)
      ? this._config.extra_entities
      : [];

    const rows = extraEntities
      .map((entry) => typeof entry === "string" ? { entity: entry } : entry)
      .map((entry) => {
        const state = this._getEntityState(entry.entity);
        return { entry, state };
      })
      .filter((row) => this._config.show_missing || row.state);

    if (!rows.length) {
      return "";
    }

    return `
      <section class="section">
        <h3>Extra</h3>
        <div class="field-grid">
          ${rows.map(({ entry, state }) => `
            <button class="field${state ? "" : " missing"}" data-entity-id="${escapeHtml(entry.entity || "")}">
              <ha-icon icon="${escapeHtml(entry.icon || "mdi:chart-line")}"></ha-icon>
              <span class="field-label">${escapeHtml(entry.name || state?.attributes?.friendly_name || entry.entity)}</span>
              <strong>${escapeHtml(state ? formatState(state) : "Missing")}</strong>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  _renderEmptyState(message) {
    return `
      <div class="empty">
        <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>
        <span>${escapeHtml(message)}</span>
      </div>
    `;
  }

  _styles() {
    return `
      :host {
        display: block;
        container-type: inline-size;
      }

      ha-card {
        overflow: hidden;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        color: var(--primary-text-color, #1d1d1f);
      }

      .card {
        --auto-scale: 1;
        --scale: clamp(0.45, calc(var(--manual-scale, 1) * var(--auto-scale)), 1.2);
        padding: calc(12px * var(--scale));
      }

      .header {
        align-items: flex-start;
        display: flex;
        gap: calc(10px * var(--scale));
        justify-content: space-between;
        margin-bottom: calc(10px * var(--scale));
      }

      h2,
      h3,
      p {
        margin: 0;
      }

      h2 {
        font-size: calc(18px * var(--scale));
        font-weight: 680;
        line-height: 1.1;
      }

      p {
        color: var(--secondary-text-color, #727272);
        font-size: calc(12px * var(--scale));
        margin-top: calc(2px * var(--scale));
      }

      button {
        appearance: none;
        cursor: pointer;
        font: inherit;
      }

      .summary {
        align-items: stretch;
        display: grid;
        gap: calc(8px * var(--scale));
        grid-template-columns: minmax(0, 1fr) calc(132px * var(--scale));
        margin-bottom: calc(8px * var(--scale));
      }

      .weather-current,
      .wind-summary,
      .summary-item,
      .field {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        border-radius: calc(8px * var(--scale));
        color: inherit;
      }

      .weather-current {
        display: grid;
        gap: calc(7px * var(--scale));
        min-height: calc(114px * var(--scale));
        padding: calc(10px * var(--scale));
        text-align: left;
      }

      .weather-icon-row {
        align-items: center;
        color: var(--secondary-text-color, #727272);
        display: flex;
        gap: calc(8px * var(--scale));
        font-size: calc(12px * var(--scale));
        line-height: 1.2;
        min-height: calc(30px * var(--scale));
      }

      .weather-icon-row strong {
        color: var(--primary-text-color, #1d1d1f);
        font-size: calc(13px * var(--scale));
        font-weight: 700;
        margin-left: auto;
      }

      .weather-icon {
        color: var(--primary-color, #03a9f4);
        font-size: calc(24px * var(--scale));
        height: calc(30px * var(--scale));
        width: calc(30px * var(--scale));
      }

      .temperature {
        display: grid;
        gap: calc(3px * var(--scale));
      }

      .temperature .label,
      .summary-item span,
      .field-label,
      .wind-metric > span:not(.wind-force) {
        color: var(--secondary-text-color, #727272);
        font-size: calc(11px * var(--scale));
        line-height: 1.2;
      }

      .temperature strong {
        display: block;
        font-size: calc(34px * var(--scale));
        font-weight: 740;
        letter-spacing: 0;
        line-height: 0.95;
      }

      .temperature small,
      .wind-metric small {
        color: var(--secondary-text-color, #727272);
        font-size: calc(11px * var(--scale));
        line-height: 1.2;
      }

      .wind-summary {
        display: grid;
        grid-template-rows: auto 1fr;
        min-height: calc(114px * var(--scale));
        padding: calc(8px * var(--scale));
      }

      .wind-dial {
        align-items: center;
        background: transparent;
        border: 0;
        color: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(54px * var(--scale));
        padding: 0;
      }

      .dial-ring {
        align-items: center;
        border: 1px solid color-mix(in srgb, var(--primary-color, #03a9f4) 42%, transparent);
        border-radius: 50%;
        display: flex;
        height: calc(38px * var(--scale));
        justify-content: center;
        width: calc(38px * var(--scale));
      }

      .dial-ring ha-icon {
        height: calc(24px * var(--scale));
        width: calc(24px * var(--scale));
      }

      .dial-ring ha-icon {
        color: var(--primary-color, #03a9f4);
        transform: rotate(var(--rotation));
      }

      .wind-dial span {
        color: var(--secondary-text-color, #727272);
        font-size: calc(11px * var(--scale));
        line-height: 1.2;
        margin-top: calc(4px * var(--scale));
      }

      .wind-values {
        display: grid;
        gap: calc(4px * var(--scale));
      }

      .wind-metric {
        background: transparent;
        border: 0;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        color: inherit;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        min-width: 0;
        padding: calc(5px * var(--scale)) 0 calc(2px * var(--scale));
        text-align: left;
      }

      .wind-metric strong {
        font-size: calc(13px * var(--scale));
        font-weight: 700;
        line-height: 1.15;
        text-align: right;
      }

      .wind-metric small {
        grid-column: 1 / -1;
        margin-top: calc(2px * var(--scale));
      }

      .wind-force {
        display: grid;
        gap: calc(1px * var(--scale));
        grid-column: 1 / -1;
        margin-top: calc(3px * var(--scale));
        min-width: 0;
      }

      .wind-force small {
        color: var(--secondary-text-color, #727272);
        font-size: calc(10px * var(--scale));
        line-height: 1;
        margin: 0;
      }

      .wind-force b {
        color: var(--primary-text-color, #1d1d1f);
        display: block;
        font-size: calc(29px * var(--scale));
        font-weight: 760;
        letter-spacing: 0;
        line-height: 0.92;
        overflow-wrap: anywhere;
      }

      .wind-force.is-long b {
        font-size: calc(21px * var(--scale));
        line-height: 0.95;
      }

      .weather-description,
      .ai-summary {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        border-radius: calc(8px * var(--scale));
        color: inherit;
        margin-bottom: calc(8px * var(--scale));
        width: 100%;
      }

      .weather-description {
        align-items: center;
        display: grid;
        gap: calc(12px * var(--scale));
        grid-template-columns: calc(78px * var(--scale)) minmax(0, 1fr);
        min-height: calc(92px * var(--scale));
        overflow: hidden;
        padding: calc(10px * var(--scale)) calc(12px * var(--scale));
        position: relative;
        text-align: left;
      }

      .ha-weather-animation {
        align-items: center;
        display: grid;
        height: calc(72px * var(--scale));
        justify-items: center;
        overflow: hidden;
        position: relative;
        width: calc(72px * var(--scale));
      }

      .weather-svg {
        height: calc(72px * var(--scale));
        overflow: visible;
        width: calc(72px * var(--scale));
      }

      .weather-sun-core {
        animation: weather-icon-pulse 4s ease-in-out infinite;
        transform-origin: center;
      }

      .weather-sun-rays {
        animation: weather-icon-spin 18s linear infinite;
        transform-origin: center;
      }

      .weather-cloud {
        animation: weather-icon-drift 4.2s ease-in-out infinite;
      }

      .weather-rain {
        animation: weather-icon-drop 1.15s ease-in-out infinite;
      }

      .weather-snow {
        animation: weather-icon-drop 1.8s ease-in-out infinite;
      }

      .weather-lightning {
        animation: weather-icon-pulse 1.1s ease-in-out infinite;
        transform-origin: center;
      }

      .weather-wind {
        animation: weather-icon-wind 1.8s ease-in-out infinite;
      }

      .weather-icon-layer {
        animation: weather-icon-float 3.4s ease-in-out infinite;
        color: var(--state-icon-color, var(--primary-color, #03a9f4));
        font-size: calc(58px * var(--scale));
        height: calc(58px * var(--scale));
        line-height: 1;
        position: absolute;
        width: calc(58px * var(--scale));
      }

      .layer-main {
        left: calc(7px * var(--scale));
        top: calc(7px * var(--scale));
      }

      .layer-sun {
        animation: weather-icon-spin 10s linear infinite;
        color: #f6b800;
      }

      .layer-back-sun {
        font-size: calc(48px * var(--scale));
        height: calc(48px * var(--scale));
        left: calc(3px * var(--scale));
        top: calc(2px * var(--scale));
        width: calc(48px * var(--scale));
      }

      .layer-cloud {
        animation: weather-icon-drift 4.2s ease-in-out infinite;
        color: #7b8794;
      }

      .layer-front-cloud {
        font-size: calc(54px * var(--scale));
        height: calc(54px * var(--scale));
        left: calc(17px * var(--scale));
        top: calc(20px * var(--scale));
        width: calc(54px * var(--scale));
      }

      .layer-top-cloud {
        font-size: calc(48px * var(--scale));
        height: calc(48px * var(--scale));
        left: calc(10px * var(--scale));
        top: calc(2px * var(--scale));
        width: calc(48px * var(--scale));
      }

      .layer-rain {
        animation: weather-icon-drop 1.15s ease-in-out infinite;
        color: #1976d2;
      }

      .layer-snow {
        animation: weather-icon-drop 1.6s ease-in-out infinite;
        color: #56b5e8;
      }

      .layer-lightning,
      .layer-alert {
        animation: weather-icon-pulse 1.1s ease-in-out infinite;
        color: #e3a008;
      }

      .layer-moon {
        color: #7c4dff;
      }

      .layer-fog {
        color: #90a4ae;
      }

      .layer-fog-cloud {
        font-size: calc(46px * var(--scale));
        height: calc(46px * var(--scale));
        left: calc(11px * var(--scale));
        opacity: 0.78;
        top: calc(1px * var(--scale));
        width: calc(46px * var(--scale));
      }

      .layer-wind {
        animation: weather-icon-wind 1.8s ease-in-out infinite;
        color: #00838f;
      }

      .weather-description-copy {
        align-content: center;
        display: grid;
        gap: calc(4px * var(--scale));
        min-width: 0;
      }

      .weather-description-copy strong {
        font-size: calc(19px * var(--scale));
        font-weight: 730;
        line-height: 1.15;
      }

      .ai-summary strong {
        font-size: calc(14px * var(--scale));
        font-weight: 730;
        line-height: 1.15;
      }

      .weather-description-copy span,
      .ai-summary span {
        color: var(--secondary-text-color, #727272);
        font-size: calc(12px * var(--scale));
        line-height: 1.2;
      }

      .ai-summary {
        display: grid;
        padding: calc(9px * var(--scale)) calc(10px * var(--scale));
      }

      .ai-summary p {
        color: var(--primary-text-color, #1d1d1f);
        font-size: calc(12px * var(--scale));
        line-height: 1.35;
        margin: 0;
      }

      .ai-summary.is-fallback p {
        color: var(--secondary-text-color, #727272);
      }

      .quick-grid {
        display: grid;
        gap: calc(6px * var(--scale));
        grid-template-columns: repeat(4, minmax(0, 1fr));
        margin-bottom: calc(10px * var(--scale));
      }

      .summary-item {
        align-items: center;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: calc(2px * var(--scale));
        min-height: calc(40px * var(--scale));
        padding: calc(7px * var(--scale)) calc(8px * var(--scale));
        text-align: left;
      }

      .summary-copy {
        display: grid;
        gap: calc(2px * var(--scale));
        min-width: 0;
      }

      .summary-item strong {
        font-size: calc(13px * var(--scale));
        font-weight: 700;
        line-height: 1.15;
        min-width: 0;
        overflow-wrap: anywhere;
      }

      .metric-status {
        align-items: center;
        display: grid;
        grid-template-rows: repeat(3, calc(10px * var(--scale)));
        justify-content: center;
        margin-left: calc(6px * var(--scale));
        min-height: calc(30px * var(--scale));
        width: calc(18px * var(--scale));
      }

      .status-arrow,
      .status-normal {
        opacity: 0;
      }

      .status-arrow {
        color: #d93025;
        font-size: calc(13px * var(--scale));
        font-weight: 900;
        line-height: calc(10px * var(--scale));
        text-align: center;
      }

      .status-normal {
        background: #188038;
        border-radius: 50%;
        box-shadow: 0 0 calc(7px * var(--scale)) rgba(24, 128, 56, 0.4);
        height: calc(8px * var(--scale));
        justify-self: center;
        width: calc(8px * var(--scale));
      }

      .metric-status-high .status-arrow-high,
      .metric-status-low .status-arrow-low,
      .metric-status-normal .status-normal {
        opacity: 1;
      }

      .sections {
        display: grid;
        gap: calc(10px * var(--scale));
      }

      .section h3 {
        color: var(--primary-text-color, #1d1d1f);
        font-size: calc(13px * var(--scale));
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: calc(6px * var(--scale));
      }

      .field-grid {
        display: grid;
        gap: calc(6px * var(--scale));
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .field {
        align-items: center;
        display: grid;
        gap: calc(4px * var(--scale)) calc(6px * var(--scale));
        grid-template-columns: calc(18px * var(--scale)) minmax(0, 1fr);
        min-height: calc(44px * var(--scale));
        padding: calc(7px * var(--scale)) calc(8px * var(--scale));
        text-align: left;
      }

      .field ha-icon {
        color: var(--primary-color, #03a9f4);
        grid-row: span 2;
        height: calc(18px * var(--scale));
        width: calc(18px * var(--scale));
      }

      .field strong {
        font-size: calc(13px * var(--scale));
        font-weight: 700;
        line-height: 1.1;
        min-width: 0;
        overflow-wrap: anywhere;
      }

      .field.missing {
        opacity: 0.58;
      }

      .empty {
        align-items: center;
        color: var(--secondary-text-color, #727272);
        display: flex;
        gap: calc(10px * var(--scale));
        justify-content: center;
        min-height: calc(96px * var(--scale));
      }

      .compact {
        padding: calc(10px * var(--scale));
      }

      .compact .field-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @container (max-width: 400px) {
        .card {
          --auto-scale: 0.94;
        }
      }

      @container (max-width: 360px) {
        .card {
          --auto-scale: 0.86;
        }
      }

      @container (max-width: 320px) {
        .card {
          --auto-scale: 0.78;
        }
      }

      @container (max-width: 280px) {
        .card {
          --auto-scale: 0.7;
        }
      }

      @container (max-width: 240px) {
        .card {
          --auto-scale: 0.62;
        }
      }

      @container (max-width: 520px) {
        .card {
          padding: calc(12px * var(--scale));
        }

        .quick-grid,
        .field-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @container (max-width: 220px) {
        .card {
          --auto-scale: 0.54;
        }
      }

      @container (max-width: 340px) {
        .summary {
          grid-template-columns: 1fr;
        }
      }

      @keyframes weather-icon-float {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(calc(-2px * var(--scale)));
        }
      }

      @keyframes weather-icon-spin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }

      @keyframes weather-icon-drift {
        0%,
        100% {
          transform: translateX(calc(-3px * var(--scale)));
        }

        50% {
          transform: translateX(calc(4px * var(--scale)));
        }
      }

      @keyframes weather-icon-drop {
        0%,
        100% {
          transform: translateY(calc(-2px * var(--scale)));
        }

        50% {
          transform: translateY(calc(3px * var(--scale)));
        }
      }

      @keyframes weather-icon-pulse {
        0%,
        100% {
          filter: drop-shadow(0 0 0 rgba(247, 183, 49, 0));
          transform: scale(1);
        }

        50% {
          filter: drop-shadow(0 0 calc(8px * var(--scale)) rgba(247, 183, 49, 0.55));
          transform: scale(1.08);
        }
      }

      @keyframes weather-icon-wind {
        0%,
        100% {
          transform: translateX(calc(-4px * var(--scale)));
        }

        50% {
          transform: translateX(calc(5px * var(--scale)));
        }
      }

      @keyframes metric-pulse {
        0%,
        100% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.08);
        }
      }

      @keyframes metric-bob {
        0%,
        100% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(calc(-2px * var(--scale)));
        }
      }

      @keyframes metric-steam {
        0%,
        100% {
          opacity: 0.82;
          transform: translateY(0);
        }

        50% {
          opacity: 0.46;
          transform: translateY(calc(-3px * var(--scale)));
        }
      }

      @keyframes metric-needle {
        0%,
        100% {
          filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
        }

        50% {
          filter: drop-shadow(0 0 calc(2px * var(--scale)) rgba(0, 0, 0, 0.18));
        }
      }

      @keyframes metric-beam {
        0%,
        100% {
          opacity: 0.42;
        }

        50% {
          opacity: 0.85;
        }
      }
    `;
  }
}

customElements.define(CARD_TAG, EcowittWs90Card);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: "Ecowitt WS-90 Card",
  description: "Weather station dashboard card for Ecowitt WS-90 sensors."
});

document.addEventListener("click", (event) => {
  const path = event.composedPath();
  const target = path.find((node) => node?.dataset?.entityId);

  if (!target?.dataset?.entityId) {
    return;
  }

  const card = path.find((node) => node?.tagName?.toLowerCase() === CARD_TAG);

  if (!card) {
    return;
  }

  const actionEvent = new Event("hass-action", {
    bubbles: true,
    composed: true
  });
  actionEvent.detail = {
    config: {
      entity: target.dataset.entityId,
      tap_action: {
        action: "more-info"
      }
    },
    action: "tap"
  };
  card.dispatchEvent(actionEvent);
});

function formatState(state) {
  if (!state || state.state === "unknown" || state.state === "unavailable") {
    return "—";
  }

  const unit = state.attributes?.unit_of_measurement || "";
  return `${state.state}${unit ? ` ${unit}` : ""}`;
}

function entityDataAttr(entityId) {
  return entityId ? `data-entity-id="${escapeHtml(entityId)}"` : "";
}

function sentenceCase(value) {
  return String(value || "")
    .replaceAll("-", " ")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function normalizeWeatherCondition(value) {
  const normalized = String(value || "").trim().toLowerCase();
  const conditionMap = {
    clear: "sunny",
    "clear-night": "clear-night",
    cloudy: "cloudy",
    fog: "fog",
    hail: "hail",
    exceptional: "exceptional",
    lightning: "lightning",
    "lightning-rainy": "lightning-rainy",
    partlycloudy: "partlycloudy",
    "partly-cloudy": "partlycloudy",
    pouring: "pouring",
    rain: "rainy",
    rainy: "rainy",
    snow: "snowy",
    snowy: "snowy",
    "snowy-rainy": "snowy-rainy",
    sun: "sunny",
    sunny: "sunny",
    wind: "windy",
    windy: "windy",
    "windy-variant": "windy-variant"
  };

  return conditionMap[normalized];
}

function getSummaryText(entity) {
  if (!entity || entity.state === "unknown" || entity.state === "unavailable") {
    return "";
  }

  const candidates = [
    entity.attributes?.summary,
    entity.attributes?.text,
    entity.attributes?.message,
    entity.state
  ];

  return String(candidates.find((candidate) => typeof candidate === "string" && candidate.trim()) || "").trim();
}

function numberFromState(state) {
  if (!state || state.state === "unknown" || state.state === "unavailable") {
    return NaN;
  }

  return parseNumericValue(state.state);
}

function metricIndicatorFor(metric, field) {
  if (!field?.state) {
    return undefined;
  }

  const season = getDanishSeason();
  const range = SEASONAL_METRIC_RANGES[metric]?.[season.key];
  const rawValue = numberFromState(field.state);
  let value = rawValue;

  if (!range || !Number.isFinite(value)) {
    return undefined;
  }

  if (metric === "pressure") {
    value = pressureToHpa(value, field.state.attributes?.unit_of_measurement);
  } else if (metric === "rain") {
    value = rainToMillimeters(value, field.state.attributes?.unit_of_measurement);
  }

  if (!Number.isFinite(value)) {
    return undefined;
  }

  const status = seasonalStatusForValue(value, range);
  const metricLabel = METRIC_STATUS_LABELS[metric] || metric;
  const optimalText = seasonalRangeText(range);
  const measuredText = metricValueText(value, range.unit);

  return {
    metric,
    value,
    status,
    label: `${metricLabel}: ${METRIC_STATUS_TEXT[status]}. ${season.label} optimal: ${optimalText}. Målt: ${measuredText}.`
  };
}

function getDanishSeason(date = new Date()) {
  const month = date.getMonth();

  if (month === 11 || month <= 1) {
    return { key: "winter", label: SEASON_LABELS.winter };
  }

  if (month <= 4) {
    return { key: "spring", label: SEASON_LABELS.spring };
  }

  if (month <= 7) {
    return { key: "summer", label: SEASON_LABELS.summer };
  }

  return { key: "autumn", label: SEASON_LABELS.autumn };
}

function seasonalStatusForValue(value, range) {
  const min = Number.isFinite(range.min) ? range.min : Number.NEGATIVE_INFINITY;
  const max = Number.isFinite(range.max) ? range.max : Number.POSITIVE_INFINITY;

  if (value < min) {
    return "low";
  }

  if (value > max) {
    return "high";
  }

  return "normal";
}

function seasonalRangeText(range) {
  if (Number.isFinite(range.min) && Number.isFinite(range.max)) {
    if (range.min === range.max) {
      return metricValueText(range.max, range.unit);
    }

    return `${metricValueText(range.min, "")}-${metricValueText(range.max, range.unit)}`;
  }

  if (Number.isFinite(range.max)) {
    return range.max === 0
      ? metricValueText(0, range.unit)
      : `op til ${metricValueText(range.max, range.unit)}`;
  }

  return "ikke defineret";
}

function metricValueText(value, unit) {
  const rounded = Math.abs(value) >= 100
    ? Math.round(value)
    : Math.round(value * 10) / 10;
  const formatted = String(rounded).replace(".", ",");

  return unit ? `${formatted} ${unit}` : formatted;
}

function rainChanceFromSummary(summary) {
  const temperature = numberFromState(summary.temperature.state);
  const humidity = numberFromState(summary.humidity.state);
  const dewPoint = numberFromState(summary.dew_point.state);
  const pressure = pressureToHpa(
    numberFromState(summary.pressure.state),
    summary.pressure.state?.attributes?.unit_of_measurement
  );

  if (![temperature, humidity, dewPoint, pressure].every(Number.isFinite)) {
    return NaN;
  }

  const dewPointSpread = Math.max(0, temperature - dewPoint);
  const humidityScore = clamp((humidity - 45) * 0.8, 0, 34);
  const dewPointScore = clamp(36 - dewPointSpread * 5.2, 0, 36);
  const pressureScore = clamp((1018 - pressure) * 1.5, -10, 36);
  const saturationBoost = humidity >= 90 && dewPointSpread <= 2
    ? 12
    : humidity >= 75 && dewPointSpread <= 4
      ? 6
      : 0;

  return clamp(Math.round(10 + humidityScore + dewPointScore + pressureScore + saturationBoost), 0, 95);
}

function pressureToHpa(value, unit) {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  const normalizedUnit = String(unit || "").trim().toLowerCase();

  if (["pa", "pascal", "pascals"].includes(normalizedUnit)) {
    return value / 100;
  }

  if (["kpa", "kilopascal", "kilopascals"].includes(normalizedUnit)) {
    return value * 10;
  }

  if (["inhg", "in hg", "incheshg", "inches hg"].includes(normalizedUnit)) {
    return value * 33.8639;
  }

  if (["mmhg", "mm hg"].includes(normalizedUnit)) {
    return value * 1.33322;
  }

  return value;
}

function rainToMillimeters(value, unit) {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  const normalizedUnit = String(unit || "").trim().toLowerCase();

  if (["in", "inch", "inches"].includes(normalizedUnit)) {
    return value * 25.4;
  }

  return value;
}

function parseNumericValue(value) {
  const normalized = String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .replace(/[^\d,.-]/g, "");

  if (!normalized || normalized === "-" || normalized === "," || normalized === ".") {
    return NaN;
  }

  const lastComma = normalized.lastIndexOf(",");
  const lastDot = normalized.lastIndexOf(".");
  let numeric = normalized;

  if (lastComma >= 0 && lastDot >= 0) {
    numeric = lastComma > lastDot
      ? normalized.replaceAll(".", "").replace(",", ".")
      : normalized.replaceAll(",", "");
  } else if (lastComma >= 0) {
    numeric = normalized.replace(",", ".");
  } else if ((normalized.match(/\./g) || []).length > 1) {
    const lastSeparator = normalized.lastIndexOf(".");
    numeric = normalized.slice(0, lastSeparator).replaceAll(".", "") + normalized.slice(lastSeparator);
  }

  return Number.parseFloat(numeric);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function beaufortFromState(state) {
  if (!state || state.state === "unknown" || state.state === "unavailable") {
    return undefined;
  }

  const speed = numberFromState(state);

  if (!Number.isFinite(speed)) {
    return undefined;
  }

  const metersPerSecond = windSpeedToMetersPerSecond(
    speed,
    state.attributes?.unit_of_measurement
  );

  if (!Number.isFinite(metersPerSecond)) {
    return undefined;
  }

  return BEAUFORT_SCALE.find((entry) => metersPerSecond < entry.max) || BEAUFORT_SCALE[12];
}

function windSpeedToMetersPerSecond(value, unit = "m/s") {
  const normalized = String(unit).trim().toLowerCase();

  if (["m/s", "mps", "meter/s", "meters/s", "metre/s", "metres/s"].includes(normalized)) {
    return value;
  }

  if (["km/h", "kph", "kmh"].includes(normalized)) {
    return value / 3.6;
  }

  if (["mph", "mi/h"].includes(normalized)) {
    return value * 0.44704;
  }

  if (["kn", "kt", "kts", "knot", "knots"].includes(normalized)) {
    return value * 0.514444;
  }

  if (["bft", "beaufort"].includes(normalized)) {
    const score = Math.max(0, Math.min(12, Math.round(value)));
    return score === 12 ? 32.7 : BEAUFORT_SCALE[score].max - 0.1;
  }

  return value;
}

function compassToDegrees(value) {
  const normalized = String(value || "").trim().toUpperCase();
  const map = {
    N: 0,
    NNE: 22.5,
    NE: 45,
    ENE: 67.5,
    E: 90,
    ESE: 112.5,
    SE: 135,
    SSE: 157.5,
    S: 180,
    SSW: 202.5,
    SW: 225,
    WSW: 247.5,
    W: 270,
    WNW: 292.5,
    NW: 315,
    NNW: 337.5
  };

  return map[normalized] || 0;
}

function degreesToCompass(value) {
  const directions = ["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"];
  const normalized = ((value % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % directions.length;
  return directions[index];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

console.info(
  `%cECOWITT-WS90-CARD%c ${CARD_VERSION}`,
  "color: #03a9f4; font-weight: 700;",
  "color: inherit; font-weight: 400;"
);
