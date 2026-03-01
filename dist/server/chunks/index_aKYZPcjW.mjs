import { n as createVNode, F as Fragment$1, aA as __astro_tag_component__ } from './astro/server_BD3UESb9.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useState, useEffect } from 'react';
import 'clsx';

function isDarkTheme() {
  if (typeof window === "undefined") return false;
  return document.documentElement.getAttribute("data-theme") === "dark";
}
function resolveColors() {
  const dark = isDarkTheme();
  return {
    bg: dark ? "#0d1b2a" : "#f5f5f5",
    gridPrimary: dark ? "#2a3a4a" : "#d0d0d0",
    gridSection: dark ? "#1a2a3a" : "#e8e8e8",
    isDark: dark
  };
}
function useThemeColors() {
  const [colors, setColors] = useState(resolveColors);
  useEffect(() => {
    const update = () => setColors(resolveColors());
    document.addEventListener("theme-change", update);
    return () => document.removeEventListener("theme-change", update);
  }, []);
  return colors;
}

function SceneContainer({
  height = "450px",
  className = "",
  cameraPosition = [5, 5, 5],
  cameraFov = 50,
  enableOrbitControls = true,
  autoRotate = false,
  autoRotateSpeed = 1,
  showGrid = true,
  gridSize = 10,
  gridDivisions = 10,
  showAxes = true,
  showGizmo = false,
  ambientIntensity = 0.6,
  directionalIntensity = 1.2,
  directionalPosition = [5, 8, 5],
  children
}) {
  const colors = useThemeColors();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `not-prose ${className}`,
      style: {
        height,
        width: "100%",
        borderRadius: "0.5rem",
        overflow: "hidden",
        border: "1px solid var(--theme-special-lighter)"
      },
      children: /* @__PURE__ */ jsxs(
        Canvas,
        {
          camera: { position: cameraPosition, fov: cameraFov },
          style: { background: colors.bg },
          dpr: [1, 2],
          shadows: true,
          children: [
            /* @__PURE__ */ jsx("ambientLight", { intensity: ambientIntensity }),
            /* @__PURE__ */ jsx(
              "directionalLight",
              {
                position: directionalPosition,
                intensity: directionalIntensity,
                castShadow: true
              }
            ),
            showGrid && /* @__PURE__ */ jsx(
              Grid,
              {
                args: [gridSize, gridDivisions],
                cellColor: colors.gridPrimary,
                sectionColor: colors.gridSection,
                infiniteGrid: true,
                fadeDistance: gridSize * 2
              }
            ),
            showAxes && /* @__PURE__ */ jsx("axesHelper", { args: [2] }),
            children,
            enableOrbitControls && /* @__PURE__ */ jsx(
              OrbitControls,
              {
                makeDefault: true,
                autoRotate,
                autoRotateSpeed
              }
            ),
            showGizmo && /* @__PURE__ */ jsx(GizmoHelper, { alignment: "bottom-right", margin: [80, 80], children: /* @__PURE__ */ jsx(GizmoViewport, {}) })
          ]
        }
      )
    }
  );
}

function Assignment1Scene() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("mesh", { position: [0, 0.5, 0], castShadow: true, children: [
    /* @__PURE__ */ jsx("boxGeometry", { args: [1, 1, 1] }),
    /* @__PURE__ */ jsx("meshStandardMaterial", { color: "#e05555" })
  ] }) });
}

const frontmatter = {
  "title": "Assignment 1: Maths for game dev",
  "description": "This is the assignment 1 from Maths for Game Dev series",
  "publishDate": "01 Mar 2026",
  "updatedDate": "01 Mar 2026",
  "coverImage": {
    "src": "./assign1.png",
    "alt": "Assignment 1"
  },
  "tags": ["3js", "r3f", "game dev"],
  "readingTime": "1 min read"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "interactive-demo",
    "text": "Interactive Demo"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment$1, {
    children: [createVNode(_components.p, {
      children: ["This is part of ", createVNode(_components.a, {
        href: "https://acegikmo.notion.site/Lectures-Assignments-a4419295f33f46c3af113eb74b407607",
        rel: "nofollow noreferrer",
        target: "_blank",
        children: "this doc"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "interactive-demo",
      children: "Interactive Demo"
    }), "\n", createVNode(SceneContainer, {
      "client:visible": true,
      height: "500px",
      cameraPosition: [3, 3, 3],
      showGizmo: true,
      "client:component-path": "@/components/r3f/SceneContainer",
      "client:component-export": "default",
      "client:component-hydration": true,
      children: createVNode(Assignment1Scene, {})
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/post/assignment1/index.mdx";
const file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/content/post/assignment1/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment$1, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/anshul360/personal_site/scalablehacker-citrus/src/content/post/assignment1/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
//# sourceMappingURL=index_aKYZPcjW.mjs.map
