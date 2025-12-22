export const WEATHER_REFERENCES = {
  "Heat Index": [
    {
      term: "Caution",
      threshold: "27-32°C",
      color: "#FFFF55",
      definition:
        "Fatigue is possible with prolonged exposure and activity. Continuing activity could lead to heat cramps.",
    },
    {
      term: "Extreme Caution",
      threshold: "33-41°C",
      color: "#F6CC47",
      definition:
        "Heat cramps and heat exhaustion are possible. continuing activity could lead to heat stroke.",
    },
    {
      term: "Danger",
      threshold: "42-51°C",
      color: "#EC6F31",
      definition:
        "Heat cramps and heat exhaustion are likely; heat stroke is probable with continued exposure.",
    },
    {
      term: "Extreme Danger",
      threshold: "52°C and beyond",
      color: "#C13030",
      definition: "Heat stroke is imminent.",
    },
  ],
  "Wind Speed": [
    {
      term: "Light Winds",
      color: "var(--foreground)",
      threshold: "19KPH or less",
      definition:
        "Gentle breeze; leaves rustle, smoke rises vertically; generally safe and comfortable conditions.",
    },
    {
      term: "Moderate Winds",
      color: "var(--foreground)",
      threshold: "20-29KPH",
      definition: "Noticeable breeze; leaves and small branches move; outdoor activities continue without difficulty.",
    },
    {
      term: "Strong Winds",
      color: "var(--foreground)",
      threshold: "30-38KPH",
      definition:
        "Strong breeze; small branches in motion, dust and loose paper raised; umbrellas difficult to use.",
    },
        {
      term: "Tropical Depression - Level Winds",
      color: "#00CCFF",
      subtitle: "Wind Signal 1",
      threshold: "39-61KPH",
      definition: `Wind strong enough to sway large branches; small trees in motion; light structural damage possible; caution advised.`,
      leadTime: "36 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Tropical Storm - Level Winds",
      color: "#FBF300",
      subtitle: "Wind Signal 2",
      threshold: "62-88KPH",
      definition: `Considerable wind; trees may be uprooted; minor structural damage; hazardous to outdoor activities.`,
      leadTime: "24 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Severe Tropical Storm - Level Winds",
      color: "#FFA800",
      subtitle: "Wind Signal 3",
      threshold: "89-117KPH",
      definition: `Heavy wind; widespread damage to weak structures; large branches broken; danger to light outdoor objects.`,
      leadTime: "18 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Typhoon - Level Winds",
      color: "#E63946",
      subtitle: "Wind Signal 4",
      threshold: "118-184KPH",
      definition: `Violent wind; uprooted trees; significant structural damage; dangerous to all outdoor activities; stay indoors.`,
      leadTime: "18 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Super Typhoon - Level Winds",
      color: "#CB00CE",
      subtitle: "Wind Signal 5",
      threshold: "185KPH and above",
      definition: `Extremely violent winds; widespread devastation; catastrophic damage expected; emergency measures imperative.`,
      leadTime: "12 Hours",
      subcategory: "cyclone",
    },

  ],
  // "Cyclone": [
  //   {
  //     term: "Tropical Depression - Level Winds",
  //     color: "#D94835",
  //     subtitle: "Wind Signal 1",
  //     threshold: "39-61KPH",
  //     definition: `Wind strong enough to sway large branches; small trees in motion; light structural damage possible; caution advised.`,
  //     leadTime: "36 Hours",
  //     subcategory: "cyclone",
  //   },
  //   {
  //     term: "Tropical Storm - Level Winds",
  //     color: "#FBF300",
  //     subtitle: "Wind Signal 2",
  //     threshold: "62-88KPH",
  //     definition: `Considerable wind; trees may be uprooted; minor structural damage; hazardous to outdoor activities.`,
  //     leadTime: "24 Hours",
  //     subcategory: "cyclone",
  //   },
  //   {
  //     term: "Severe Tropical Storm - Level Winds",
  //     color: "#FFA800",
  //     subtitle: "Wind Signal 3",
  //     threshold: "89-117KPH",
  //     definition: `Heavy wind; widespread damage to weak structures; large branches broken; danger to light outdoor objects.`,
  //     leadTime: "18 Hours",
  //     subcategory: "cyclone",
  //   },
  //   {
  //     term: "Typhoon - Level Winds",
  //     color: "#E63946",
  //     subtitle: "Wind Signal 4",
  //     threshold: "118-184KPH",
  //     definition: `Violent wind; uprooted trees; significant structural damage; dangerous to all outdoor activities; stay indoors.`,
  //     leadTime: "18 Hours",
  //     subcategory: "cyclone",
  //   },
  //   {
  //     term: "Super Typhoon - Level Winds",
  //     color: "#CB00CE",
  //     subtitle: "Wind Signal 5",
  //     threshold: "185KPH and above",
  //     definition: `Extremely violent winds; widespread devastation; catastrophic damage expected; emergency measures imperative.`,
  //     leadTime: "12 Hours",
  //     subcategory: "cyclone",
  //   },
  // ],
  "Precipitation": [
    {
      term: "Light Rains",
      color: "var(--foreground)",
      threshold: "2.5mm/h and below",
      definition:
        "Individual drops easily identified and puddles(small muddy pools) form slowly. Small streams may flow in gutters.",
    },
    {
      term: "Moderate Rains",
      color: "var(--foreground)",
      threshold: "2.5-7.5mm/h",
      definition: "Puddles rapidly forming and down pipes flowing freely",
    },
    {
      term: "Heavy Rains",
      color: "#FFFF00",
      subtitle: "Yellow Rainfall",
      threshold: "7.5-15mmph",
      definition:
        "The sky is overcast, there is a continuous precipitation. Falls in sheets, misty spray over hard surfaces. May cause roaring noise on roofs.",
    },
    {
      term: "Intense Rain",
      color: "#FFA500",
      subtitle: "Orange Rainfall",
      threshold: "15-30mm/h",
      definition: "Flooding is threatening",
    },
    {
      term: "Torrential Rain",
      color: "#DC3545",
      subtitle: "Red Rainfall",
      threshold: "30mm/h and above",
      definition: "Flooding is threatening",
    },
  ],
  "UV Index": [
    {
      term: "Minimal",
      color: "var(--foreground)",
      threshold: "1-2",
      definition:
        "Wear sunglasses on bright days. In winter, reflection off snow can nearly double UV strength. If you burn easily, cover up and use sunscreen.",
    },
    {
      term: "Moderate",
      color: "#FFBC01",
      threshold: "3-5",
      definition:
        "Take precautions, such as covering and using sunscreen, if you will be outside. Stay in shade near midday when the sun is strongest.",
    },
    {
      term: "High",
      color: "#FF9000",
      threshold: "6-7",
      definition:
        "Protection against sunburn is needed. Reduce time in the sun between 11 a.m. and 4 p.m. Cover up, wear a hat and sunglasses, and use sunscreen",
    },
    {
      term: "Very High",
      color: "#F55023",
      threshold: "8-10",
      definition:
        "Take extra precautions. Unprotected skin will be damaged and can burn quickly. Try to avoid the sun between 11 a.m and 4 p.m. Otherwise, seek shade, cover up, wear a hat and sunglasses, and use sunscreen.",
    },
    {
      term: "Extreme",
      color: "#9E47CC",
      threshold: "11+",
      definition:
        "Take all precautions. unprotected skin can burn in minutes. Beachgoers should know that white sand and other bright surfaces reflect UV and will increase UV exposure. Avoid the sun between 11 a.m and 4 p.m. Seek shade, cover up, wear a hat and sunglasses, and use sunscreen.",
    },
  ],

};