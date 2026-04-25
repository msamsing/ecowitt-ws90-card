# Ecowitt WS-90 Card

A Home Assistant Lovelace custom card for showing Ecowitt WS-90 weather station data in one compact dashboard.

The card is dependency-free JavaScript. Build output is written to `dist/ecowitt-ws90-card.js`.

## Features

- Compact summary view for the WS-90 sensors shown by Home Assistant.
- Container-based scaling so text, icons and spacing shrink with narrower dashboard cards.
- Optional animated PirateWeather graphic driven by a selected weather entity or WS-90 data.
- Optional AI summary text with selectable provider label and summary entity.
- Beaufort score and Danish wind-force name below the wind speed.
- Derived compass direction from the numeric `Direction` sensor.
- Click any populated tile to open Home Assistant's entity more-info dialog.
- Hide missing sensors by default, or show them while setting up.
- Optional `entity_prefix` fallback for common `sensor.<prefix>_<field>` entity IDs.
- Optional `extra_entities` for Ecowitt sensors that do not fit the built-in fields.

## HACS custom repository

This card is ready to be installed through HACS as a custom Dashboard repository.

For the smoothest HACS install, publish this project as a public GitHub repository named:

```text
ecowitt-ws90-card
```

Then in Home Assistant:

1. Open HACS.
2. Go to the three-dot menu and choose Custom repositories.
3. Paste your GitHub repository URL, for example:

```text
https://github.com/msamsing/ecowitt-ws90-card
```

4. Choose category `Dashboard`.
5. Add the repository and download the card.
6. If Home Assistant does not add the dashboard resource automatically, add this resource manually:

```yaml
url: /hacsfiles/ecowitt-ws90-card/ecowitt-ws90-card.js
type: module
```

After updates, refresh the browser cache or use Home Assistant's reload resources option.

## Manual install

Build the card:

```bash
npm run build
```

Copy `dist/ecowitt-ws90-card.js` to Home Assistant:

```text
/config/www/ecowitt-ws90-card.js
```

Add it as a Lovelace resource:

```yaml
url: /local/ecowitt-ws90-card.js
type: module
```

Then add the card:

```yaml
type: custom:ecowitt-ws90-card
title: Ecowitt WS-90
station_name: Garden weather
show_missing: false
scale: 1
show_pirateweather_graphic: true
pirateweather_entity: weather.pirateweather
show_ai_summary: true
ai_provider: openai
ai_summary_entity: sensor.ws90_ai_summary
entities:
  temperature: sensor.ws90_temperature
  humidity: sensor.ws90_humidity
  dew_point: sensor.ws90_dew_point
  pressure: sensor.ws90_pressure
  wetness: sensor.ws90_wetness
  wind_speed: sensor.ws90_wind_speed
  wind_gust: sensor.ws90_wind_gust
  wind_bearing: sensor.ws90_direction
  rain: sensor.ws90_rain
  voltage: sensor.ws90_voltage
  uv_index: sensor.ws90_uv_index
  illuminance: sensor.ws90_illuminance
```

If your entities follow a consistent prefix, you can configure fewer IDs:

```yaml
type: custom:ecowitt-ws90-card
entity_prefix: ws90
```

That will look for entities like `sensor.ws90_temperature`, `sensor.ws90_wind_speed` and `sensor.ws90_rain`.

## Configuration

The card supports Home Assistant's visual editor. You can edit the title and choose the exact WS-90 sensor entities from the `WS-90 entities` panel in the card UI.

The optional AI summary is display-only in the card. Create/update the selected `ai_summary_entity` from a Home Assistant automation or integration, so API keys stay in Home Assistant rather than in the browser.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | `Ecowitt WS-90` | Card title. |
| `station_name` | string | `Weather station` | Subtitle below the title. |
| `entities` | object | `{}` | Map built-in field keys to Home Assistant entity IDs. |
| `entity_prefix` | string | `""` | Optional fallback for `sensor.<prefix>_<field>` IDs. |
| `extra_entities` | array | `[]` | Additional sensors to show in an `Extra` section. |
| `sections` | array | all sections | Advanced: usually leave this alone; the built-in WS-90 fields are shown in the compact summary. |
| `show_missing` | boolean | `false` | Show tiles for configured but unavailable sensors. |
| `compact` | boolean | `false` | Use a tighter layout. |
| `scale` | number | `1` | Manual text/icon scale multiplier from `0.5` to `1.2`; auto-scaling still applies when the card gets narrow. |
| `show_pirateweather_graphic` | boolean | `false` | Show an animated PirateWeather-style graphic. |
| `pirateweather_entity` | string | `""` | Optional weather entity used to drive the animation state. |
| `show_ai_summary` | boolean | `false` | Show the AI summary block. |
| `ai_provider` | string | `home_assistant` | Provider label: `home_assistant`, `openai`, `anthropic`, `google`, `ollama`, or `custom`. |
| `ai_summary_entity` | string | `""` | Entity containing summary text from your AI automation/integration. |

Extra entities can be strings:

```yaml
extra_entities:
  - sensor.ws90_soil_temperature
  - sensor.ws90_pm25
```

Or objects:

```yaml
extra_entities:
  - entity: sensor.ws90_soil_temperature
    name: Soil temperature
    icon: mdi:sprout
```
