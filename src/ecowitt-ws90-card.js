const CARD_VERSION = "0.1.0";

const FIELD_DEFINITIONS = [
  {
    id: "conditions",
    title: "Vejrdata",
    fields: [
      { key: "temperature", label: "Temperatur", icon: "mdi:thermometer", suffixes: ["temperature", "outdoor_temperature", "temp", "temperatur"] },
      { key: "humidity", label: "Luftfugtighed", icon: "mdi:water-percent", suffixes: ["humidity", "outdoor_humidity", "luftfugtighed"] },
      { key: "dew_point", label: "Dugpunkt", icon: "mdi:water-thermometer", suffixes: ["dew_point", "dewpoint", "dugpunkt"] },
      { key: "pressure", label: "Lufttryk", icon: "mdi:gauge", suffixes: ["pressure", "air_pressure", "barometric_pressure", "relative_pressure", "lufttryk"] },
      { key: "wetness", label: "Fugtighed", icon: "mdi:water-off", suffixes: ["wetness", "moisture", "rain_state", "fugtighed"] },
      { key: "voltage", label: "Spænding", icon: "mdi:sine-wave", suffixes: ["voltage", "battery_voltage", "spaending", "spænding"] }
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
  "voltage",
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
  show_pirateweather_graphic: "Vis PirateWeather grafik",
  pirateweather_entity: "PirateWeather entity",
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
  voltage: "Spænding",
  uv_index: "UV Index",
  illuminance: "Belysningsstyrke"
};
const CONFIG_HELPERS = {
  entity_prefix: "Valgfrit. Bruges kun hvis du ikke vælger entities manuelt.",
  scale: "Finjusterer auto-skaleringen. 1 er normal størrelse.",
  wind_speed: "Vælg den normale hastighedssensor. Bruges også til Beaufort.",
  wind_gust: "Vælg den anden hastighedssensor, hvis den repræsenterer vindstød.",
  wind_bearing: "Vælg Direction-sensoren i grader. Kortet beregner kompasretningen ud fra denne.",
  pirateweather_entity: "Valgfrit. Hvis valgt, styrer denne weather entity den animerede grafik.",
  ai_provider: "Valget gemmes i kortets config og vises sammen med summary-teksten.",
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
  { name: "voltage", selector: { entity: { domain: "sensor" } } },
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
const CARD_TAG = "ecowitt-ws90-card";

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
      show_pirateweather_graphic: false,
      pirateweather_entity: "",
      show_ai_summary: false,
      ai_provider: "home_assistant",
      ai_summary_entity: "",
      ...config
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
        voltage: "sensor.ws90_voltage",
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
                { name: "show_pirateweather_graphic", selector: { boolean: {} } },
                { name: "pirateweather_entity", selector: { entity: { domain: "weather" } } },
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
    const pirateWeather = this._getPirateWeatherGraphic(summary, wetness);
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
            <div class="badge">WS-90</div>
          </header>

          ${!hass ? this._renderEmptyState("Waiting for Home Assistant data") : ""}

          ${hass ? `
            ${this._config.show_pirateweather_graphic ? this._renderPirateWeatherGraphic(pirateWeather) : ""}

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
              ${this._renderSummaryItem("Dugpunkt", summary.dew_point)}
              ${this._renderSummaryItem("Lufttryk", summary.pressure)}
              ${this._renderSummaryItem("Nedbør", summary.rain)}
              ${this._renderSummaryItem("UV", summary.uv_index)}
              ${this._renderSummaryItem("Belysningsstyrke", summary.illuminance)}
              ${this._renderSummaryItem("Spænding", summary.voltage)}
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
      voltage: this._formatField("voltage"),
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

  _getPirateWeatherGraphic(summary, wetness) {
    const configuredState = this._getEntityState(this._config.pirateweather_entity);
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
      label: GRAPHIC_LABELS[condition] || sentenceCase(condition),
      source: configuredState ? configuredState.attributes?.friendly_name || configuredState.entity_id : "WS-90"
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

  _renderSummaryItem(label, field) {
    if (!field?.state && !this._config.show_missing) {
      return "";
    }

    return `
      <button class="summary-item" ${entityDataAttr(field.entityId)}>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(field.value)}</strong>
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

  _renderPirateWeatherGraphic(graphic) {
    const conditionClass = `condition-${escapeHtml(graphic.condition)}`;

    return `
      <button class="pirate-weather ${conditionClass}" ${entityDataAttr(graphic.entityId)}>
        <div class="ha-weather-animation" aria-hidden="true">
          <ha-icon class="ha-weather-condition-icon" icon="${escapeHtml(graphic.icon)}"></ha-icon>
        </div>
        <div class="pirate-copy">
          <strong>PirateWeather</strong>
          <span>${escapeHtml(graphic.label)} · ${escapeHtml(graphic.source)}</span>
        </div>
      </button>
    `;
  }

  _renderAiSummary(summary) {
    return `
      <section class="ai-summary ${summary.fallback ? "is-fallback" : ""}" ${entityDataAttr(summary.entityId)}>
        <div>
          <span>${escapeHtml(summary.provider)}</span>
          <strong>AI summary</strong>
        </div>
        <p>${escapeHtml(summary.text)}</p>
      </section>
    `;
  }

  _renderWindMetric(label, field, beaufort) {
    return `
      <button class="wind-metric" ${entityDataAttr(field.entityId)}>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(field.value)}</strong>
        ${beaufort ? `<small>Bft ${beaufort.score} - ${escapeHtml(beaufort.name)}</small>` : ""}
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

      .badge {
        align-items: center;
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 14%, transparent);
        border: 1px solid color-mix(in srgb, var(--primary-color, #03a9f4) 30%, transparent);
        border-radius: calc(999px * var(--scale));
        color: var(--primary-color, #03a9f4);
        display: flex;
        flex: 0 0 auto;
        font-size: calc(11px * var(--scale));
        font-weight: 700;
        min-height: calc(24px * var(--scale));
        padding: 0 calc(8px * var(--scale));
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
      .wind-metric span {
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
        gap: calc(2px * var(--scale));
      }

      .wind-metric {
        background: transparent;
        border: 0;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        color: inherit;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        min-width: 0;
        padding: calc(5px * var(--scale)) 0 0;
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

      .pirate-weather,
      .ai-summary {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        border-radius: calc(8px * var(--scale));
        color: inherit;
        margin-bottom: calc(8px * var(--scale));
        width: 100%;
      }

      .pirate-weather {
        align-items: center;
        display: grid;
        gap: calc(9px * var(--scale));
        grid-template-columns: calc(56px * var(--scale)) minmax(0, 1fr);
        min-height: calc(66px * var(--scale));
        overflow: hidden;
        padding: calc(8px * var(--scale)) calc(10px * var(--scale));
        position: relative;
        text-align: left;
      }

      .ha-weather-animation {
        align-items: center;
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 10%, var(--card-background-color, #fff));
        border-radius: calc(8px * var(--scale));
        display: grid;
        height: calc(52px * var(--scale));
        justify-items: center;
        overflow: hidden;
        position: relative;
        width: calc(52px * var(--scale));
      }

      .ha-weather-condition-icon {
        animation: weather-icon-float 3.4s ease-in-out infinite;
        color: var(--state-icon-color, var(--primary-color, #03a9f4));
        font-size: calc(34px * var(--scale));
        height: calc(38px * var(--scale));
        line-height: 1;
        position: relative;
        width: calc(38px * var(--scale));
      }

      .condition-sunny .ha-weather-condition-icon,
      .condition-clear-night .ha-weather-condition-icon {
        animation: weather-icon-spin 10s linear infinite;
        color: #f7b731;
      }

      .condition-cloudy .ha-weather-condition-icon,
      .condition-partlycloudy .ha-weather-condition-icon,
      .condition-fog .ha-weather-condition-icon {
        animation: weather-icon-drift 4.2s ease-in-out infinite;
      }

      .condition-rainy .ha-weather-condition-icon,
      .condition-pouring .ha-weather-condition-icon,
      .condition-hail .ha-weather-condition-icon,
      .condition-snowy .ha-weather-condition-icon,
      .condition-snowy-rainy .ha-weather-condition-icon {
        animation: weather-icon-drop 1.15s ease-in-out infinite;
        color: #4f8fc9;
      }

      .condition-lightning .ha-weather-condition-icon,
      .condition-lightning-rainy .ha-weather-condition-icon,
      .condition-exceptional .ha-weather-condition-icon {
        animation: weather-icon-pulse 1.1s ease-in-out infinite;
        color: #e3a008;
      }

      .condition-windy .ha-weather-condition-icon,
      .condition-windy-variant .ha-weather-condition-icon {
        animation: weather-icon-wind 1.8s ease-in-out infinite;
      }

      .pirate-copy {
        align-content: center;
        display: grid;
        gap: calc(4px * var(--scale));
        min-width: 0;
      }

      .pirate-copy strong,
      .ai-summary strong {
        font-size: calc(14px * var(--scale));
        font-weight: 730;
        line-height: 1.15;
      }

      .pirate-copy span,
      .ai-summary span {
        color: var(--secondary-text-color, #727272);
        font-size: calc(11px * var(--scale));
        line-height: 1.2;
      }

      .ai-summary {
        display: grid;
        gap: calc(6px * var(--scale));
        padding: calc(9px * var(--scale)) calc(10px * var(--scale));
      }

      .ai-summary > div {
        align-items: baseline;
        display: flex;
        gap: calc(8px * var(--scale));
        justify-content: space-between;
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
        display: grid;
        gap: calc(2px * var(--scale));
        min-height: calc(40px * var(--scale));
        padding: calc(7px * var(--scale)) calc(8px * var(--scale));
        text-align: left;
      }

      .summary-item strong {
        font-size: calc(13px * var(--scale));
        font-weight: 700;
        line-height: 1.15;
        min-width: 0;
        overflow-wrap: anywhere;
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

  return Number.parseFloat(String(state.state).replace(",", "."));
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
