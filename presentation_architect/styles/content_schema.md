# Content Schema for PPTX Engine Layouts

This document defines the STRICT YAML schema for the `content` block of each `layout_id`.
**Art Director MUST use these exact keys** when generating the YAML blueprint. Do not invent new keys.

## L01_Cover_Standard
```yaml
content:
  title: "string (required)"
  subtitle: "string (optional)"
  background_image_path: "string (optional, absolute path to generated image)"
```

## L02_Cover_Blocks
```yaml
content:
  title: "string (required)"
```

## L03_Cover_Wireframe
```yaml
content:
  title: "string (required)"
  subtitle: "string (optional)"
```

## L04_Section_Divider
```yaml
content:
  title: "string (required)"
```

## L05_Quote_Split
```yaml
content:
  quote: "string (required, the large text)"
  paragraph: "string (required, the small explanation)"
  author: "string (optional)"
  bullets: ["string", "string"] # optional
```

## L06_Color_Split
```yaml
content:
  title: "string (required)"
  bullets: ["string", "string"] # optional list of items
```

## L07_Two_Columns
```yaml
content:
  title: "string (required)"
  column_1:
    title: "string (required)"
  column_2:
    title: "string (required)"
```

## L08_Three_Columns
```yaml
content:
  title: "string (required)"
  columns: # MUST be an array of 3 objects
    - title: "string"
      bullets: ["string"]
    - title: "string"
      bullets: ["string"]
    - title: "string"
      bullets: ["string"]
```

## L09_Four_Grid
```yaml
content:
  title: "string (required)"
  cards: # MUST be an array of 4 objects
    - title: "string"
      description: "string"
    - title: "string"
      description: "string"
    - title: "string"
      description: "string"
    - title: "string"
      description: "string"
```

## L10_Dark_Card
```yaml
content:
  title: "string (required)"
  bullets: ["string", "string"] # optional
```

## L11_Metric_Dashboard
```yaml
content:
  title: "string (required)"
  metrics: # MUST be an array of up to 3 objects
    - value: "string (e.g. '85%')"
      label: "string (e.g. 'Growth')"
    - value: "string"
      label: "string"
    - value: "string"
      label: "string"
```

## L12_Compare
```yaml
content:
  title: "string (required)"
  left_column:
    title: "string"
    bullets: ["string", "string"]
  right_column:
    title: "string"
    bullets: ["string", "string"]
```

## L13_Horizontal_Timeline
```yaml
content:
  title: "string (required)"
  items: # Array of timeline nodes
    - title: "string"
      description: "string"
    - title: "string"
      description: "string"
```

## L14_Process_4
```yaml
content:
  title: "string (required)"
  steps: # Array of exactly 4 strings representing step titles
    - "Step 1 Title"
    - "Step 2 Title"
    - "Step 3 Title"
    - "Step 4 Title"
```

## L15_Circular_Process (Fallback to Section Divider)
```yaml
content:
  title: "string (required)"
```

## L16_Dual_Pipeline (Fallback to Section Divider)
```yaml
content:
  title: "string (required)"
```

## L17_Matrix_3x3 (Fallback to Section Divider)
```yaml
content:
  title: "string (required)"
```

## L18_Stacked_Ledger (Fallback to Section Divider)
```yaml
content:
  title: "string (required)"
```

## L19_KPI_Tower (Fallback to Section Divider)
```yaml
content:
  title: "string (required)"
```

## L20_Image_Lead
```yaml
content:
  title: "string (required)"
  paragraph: "string (optional description)"
  image_path: "string (optional, absolute path to generated image)"
```
