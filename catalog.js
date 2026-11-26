// Keep repository slugs case sensitive so their GitHub Pages URLs resolve.
const toolCatalog = [
  {
    id: "sizing", title: "Vehicle Initial Sizing Lab", category: "Vehicle Design", status: "Released",
    repository: "Parametric-design", preview: "sizing",
    description: "Set preliminary mass, aero, tire and motor parameters, then estimate wheel loads, ride frequencies, gearing and braking.",
    keywords: ["Vehicle sizing", "Weight distribution", "Ride frequency"],
  },
  {
    id: "geometry", title: "Suspension Geometry Lab", category: "Suspension", status: "Released",
    repository: "Suspension-geometry", preview: "geometry",
    description: "Edit suspension hardpoints and inspect front, side, plan and 3D views of the suspension layout.",
    keywords: ["Hardpoints", "Roll center", "Camber"],
  },
  {
    id: "kinematics", title: "Suspension Kinematics Lab", category: "Suspension", status: "Released",
    repository: "Suspension-Kinematics", preview: "kinematics",
    description: "Sweep wheel travel and steering-rack displacement to inspect wheel motion, geometry changes and motion ratios.",
    keywords: ["Wheel travel", "Bump steer", "Motion ratio"],
  },
  {
    id: "statics", title: "Suspension Statics Lab", category: "Suspension", status: "Released",
    repository: "Suspension-Statics", preview: "statics",
    description: "Solve axial forces in suspension members and chassis reactions under applied loads.",
    keywords: ["Member forces", "Load cases", "Reactions"],
  },
  {
    id: "dynamics", title: "Suspension Dynamics Lab", category: "Suspension", status: "Released",
    repository: "Suspension-Dynamics", preview: "dynamics",
    description: "Simulate quarter-car, half-car and full-car responses to road inputs and review wheel loads and suspension travel.",
    keywords: ["Road inputs", "Load transfer", "Vehicle dynamics"],
  },
  {
    id: "damping", title: "Spring Damping Analysis Lab", category: "Suspension", status: "Released",
    repository: "Suspension-model", preview: "damping",
    description: "Compare spring and damper model responses with time histories, animation and overlaid results.",
    keywords: ["Spring rate", "Damping ratio", "Time response"],
  },
  {
    id: "gears", title: "Gear System Designer", category: "Powertrain", status: "Released",
    repository: "Transmission-system", preview: "gears",
    description: "Configure compound planetary gear trains, search gear combinations and preview gear mesh before CAD export.",
    keywords: ["Planetary gears", "Gear ratio", "CAD"],
  },
  {
    id: "track", title: "Track Data Tools", category: "Track & Simulation", status: "Released",
    repository: "map-data-tools", preview: "track",
    description: "Turn a track DXF into ordered geometry and XY data. Preview the route and export data for simulation.",
    keywords: ["DXF", "Track geometry", "CSV"],
  },
  {
    id: "lap", title: "LapSimLab", category: "Track & Simulation", status: "Released",
    repository: "Lap-Time-Simulator", preview: "lap",
    description: "Estimate lap time and inspect speed and vehicle-state profiles along a circuit.",
    keywords: ["Lap time", "Speed profile", "Vehicle performance"],
  },
  {
    id: "tires", title: "Tire Modeling & Parameter Fitting", category: "Tires", status: "In Development",
    repository: "Tire-Modeling-and-Parameter-Fitting", preview: "tires", action: "Open project",
    description: "Explore tire force models, parameter fitting and supporting MATLAB and Python analysis tools.",
    keywords: ["Tire forces", "Parameter fitting", "Tire stiffness"],
  },
  {
    id: "vehicle-model", title: "Vehicle 14DOF Lab", category: "Vehicle Dynamics", status: "Released",
    repository: "vehicle-model", preview: "dynamics",
    description: "Run 14-DOF vehicle simulations for skidpad, acceleration and custom tracks, then review speed, wheel loads and suspension travel.",
    keywords: ["14-DOF", "Skidpad", "Acceleration", "Vehicle telemetry"],
  },
  {
    id: "multibody", title: "Multibody Dynamics Model", category: "Vehicle Dynamics", status: "In Development",
    repository: "Multibody-dynamics-model", url: null, preview: "multibody",
    description: "A development project for multibody simulation and inverse dynamics optimization.",
    keywords: ["Multibody dynamics", "Inverse dynamics", "Optimization"],
  },
];

const workflowStages = [
  {
    title: "Parameter Settings and Data", icon: "design",
    tools: [["tires", "Tire Modeling"], ["track", "Track Data Tools"], ["sizing", "Vehicle Initial Sizing"]],
  },
  {
    title: "Preliminary Analysis", icon: "simulate",
    tools: [
      ["lap", "LapSimLab"],
      ["gears", "Gear System Designer"],
      ["damping", "Spring Damping Analysis"],
      ["geometry", "Suspension Geometry"],
      ["dynamics", "Suspension Dynamics"],
    ],
  },
  {
    title: "Modeling and Simulation", icon: "model",
    tools: [["kinematics", "Suspension Kinematics"], ["statics", "Suspension Statics"], ["vehicle-model", "Vehicle 14DOF Lab"]],
  },
  {title: "Optimization", icon: "optimize", tools: [["multibody", "Multibody Dynamics Model"]]},
  {title: "Validate and Testing", icon: "validate", tools: [], status: "In Development"},
];
