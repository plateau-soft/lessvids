import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGElEQVQ4T22TTUxTQRDH/9NH8+Dw9NbEkhYfiidJoBzwJBgiIdH6cVRAgviFJz0bpJAqIZpQPRssHpDEGPBgITEGvUvUVowUE7lKMAFiqdhnn5nt7oZ+/E7/nZ2dnZmdJZTgum4TgLMA2gGwZj4BeAfgFRGx1pBWhcO3AExoQzmbACJE9EgZdADXdefkzXCcf8hmd7Cx8Qs72SwO1gVhmtWoqjKU+xwRnWchApTevLz8FW8XF2HbNn5vbyPnOGhsPIrmJlWR4DYRxUjW/FGbJXeGhpFKpeA4DkKhZkRHR/SehMs5wQEiAIa1WfJhaQnfVtJCHz5Uj2OtrXKniBEOwN1tU5af6+uYn1/An91ddHWeBJEHrxMJeDwGwuFTqPX7lSvzngNwKvuVZehuRNSfz+dRb9vwer1YSadBRGhvO46xe1HlymyWBejo7EImkxE6GAzANE2srn4Xa8uy8GYhIbRkq6yEC929+LG2JnR/3yX4fD6MP3go1oFAAC9mpoWWiBKKmvhydhYTscei+wOX+1HrP4DR6H0YhoHB69fQ031RuTKiifyMnIUog9OfjE9h+vkMjjQ0oKamGsnUF5wJn8bNwRvYZ1nq8BaPesVBYuJTz/Bk8qnQfb09uHplQO5oCoOkVntHmeFX+JxMIvc3h5aWkChhD/ypzrGo9Jm4J/pVSuC0+TPFlKEoACN7wtErfec4ERWeSPIf9WnMqN5fRswAAAAASUVORK5CYII=",
        name: "lessvids",
        namespace: "https://github.com/plateau-soft",
        description: "Additional functionality for manyvids",
        match: ["https://www.manyvids.com/*"],
        "run-at": "document-start",
        updateURL:
          "https://github.com/plateau-soft/lessvids/releases/latest/download/lessvids.user.js",
        downloadURL:
          "https://github.com/plateau-soft/lessvids/releases/latest/download/lessvids.user.js",
      },
    }),
  ],
});
