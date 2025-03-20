import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { RootLayout } from "../layouts/root_layout.jsx";
import { CockpitText } from "../components/fields/text/index.jsx";
import { CockpitUrl } from "../components/fields/url/index.jsx";
import { CockpitId } from "../components/fields/id/index.jsx";
import { CockpitEmail } from "../components/fields/email/index.jsx";
import { CockpitBoolean } from "../components/fields/boolean/index.jsx";

const PAGES = {
  "cockpit::home": () => import("../pages/home.jsx"),
  "cockpit::resources/index": () => import("../pages/resources/index.jsx"),
};

export default function createCockpitApp() {
  return createInertiaApp({
    title: (title: string) => `${title} - Cockpit`,
    resolve: async (name) => {
      const page = await PAGES[name]();

      page.default.layout =
        page.default.layout ||
        ((page) => (
          <RootLayout
            children={page}
            breadcrumb={page.props.breadcrumb}
            resources={page.props.resources}
            fields={[
              CockpitText,
              CockpitUrl,
              CockpitId,
              CockpitEmail,
              CockpitBoolean,
            ]}
          />
        ));

      return page;
    },
    setup({ el, App, props }) {
      createRoot(el).render(<App {...props} />);
    },
  });
}
