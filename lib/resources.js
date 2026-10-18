/* Engineering process, test programme, glossary, standards and sizing-guide data */

export const MANUFACTURING_STEPS = [
  { t: 'Design', d: 'Electrical and mechanical design calculated for the rating, losses and site conditions.' },
  { t: 'Core cutting', d: 'Grain-oriented silicon steel cut to size for low core losses.' },
  { t: 'Core stacking', d: 'Step-lap stacking of the core laminations to reduce noise and no-load loss.' },
  { t: 'Winding', d: 'HV and LV coils wound from copper or aluminium conductor under controlled tension.' },
  { t: 'Insulation', d: 'Insulation system built up between windings, core and tank.' },
  { t: 'Assembly', d: 'Active part assembled, connected and clamped to withstand short-circuit forces.' },
  { t: 'Vacuum drying', d: 'Moisture removed from the active part in a vacuum oven before tanking.' },
  { t: 'Tanking & oil filling', d: 'Active part placed in the tank and filled with oil under vacuum.' },
  { t: 'Testing', d: 'Routine tests on every unit, with type and special tests as specified.' },
  { t: 'Packing & dispatch', d: 'Packed for transport with documentation and test reports.' }
];

export const TEST_GROUPS = [
  { t: 'Routine tests', d: 'Carried out on every unit before dispatch.',
    items: ['Winding resistance', 'Voltage ratio and vector group', 'Short-circuit impedance and load loss', 'No-load loss and current', 'Applied and induced voltage withstand'] },
  { t: 'Type tests', d: 'Carried out on a representative unit of a design.',
    items: ['Temperature rise', 'Lightning impulse', 'Sound level'] },
  { t: 'Special tests', d: 'Carried out when the project specification asks for them.',
    items: ['Short-circuit withstand', 'Partial discharge', 'Frequency response analysis (SFRA)'] }
];

export const GLOSSARY = [
  ['BIL', 'Basic Insulation Level. The lightning impulse voltage a winding is designed to withstand, in kV peak.'],
  ['Cast resin transformer', 'A dry-type transformer whose windings are encapsulated in epoxy resin. Used indoors where oil is not wanted.'],
  ['Conservator', 'A tank above an oil-immersed transformer that lets the oil expand and contract with temperature.'],
  ['CRGO steel', 'Cold-rolled grain-oriented silicon steel, used for transformer cores because of its low magnetic losses.'],
  ['DGA', 'Dissolved Gas Analysis. Testing the gases dissolved in transformer oil to detect developing faults.'],
  ['Hermetically sealed', 'A transformer with no conservator, where a corrugated tank absorbs oil expansion. Needs less maintenance.'],
  ['Impedance voltage', 'The voltage, as a percentage of rated voltage, needed to circulate rated current with the secondary shorted. Sets fault level.'],
  ['kVA / MVA', 'Apparent power rating of a transformer. 1 MVA = 1,000 kVA.'],
  ['Load loss', 'Losses in the windings when the transformer carries load, mostly from winding resistance.'],
  ['No-load loss', 'Losses in the core whenever the transformer is energised, whether or not it carries load.'],
  ['OLTC', 'On-Load Tap Changer. Adjusts the voltage ratio while the transformer stays in service.'],
  ['ONAN / ONAF', 'Cooling classes: Oil Natural Air Natural, and Oil Natural Air Forced (with fans).'],
  ['Package substation', 'A factory-built unit combining MV switchgear, transformer and LV distribution in one enclosure.'],
  ['SFRA', 'Sweep Frequency Response Analysis. A test that detects mechanical movement of windings and core.'],
  ['Vector group', 'Code describing how windings are connected (e.g. Dyn11) and the phase shift between primary and secondary.']
];

export const STANDARDS = [
  ['IEC 60076-1', 'Power transformers: general requirements'],
  ['IEC 60076-2', 'Temperature rise for liquid-immersed transformers'],
  ['IEC 60076-3', 'Insulation levels, dielectric tests and clearances'],
  ['IEC 60076-5', 'Ability to withstand short circuit'],
  ['IEC 60076-10', 'Determination of sound levels'],
  ['IEC 60076-11', 'Dry-type transformers'],
  ['IEC 60296', 'Unused mineral insulating oils for transformers and switchgear'],
  ['IEC 62271-200', 'AC metal-enclosed switchgear for 1 kV to 52 kV'],
  ['IEC 61439', 'Low-voltage switchgear and controlgear assemblies'],
  ['IEEE C57.12.00', 'General requirements for liquid-immersed distribution, power and regulating transformers'],
  ['ISO 9001', 'Quality management systems'],
  ['ISO 14001', 'Environmental management systems'],
  ['ISO 45001', 'Occupational health and safety management systems']
];

/* Common IEC preferred ratings, in kVA */
export const STANDARD_KVA = [25, 50, 100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000];

export const CAREER_REASONS = [
  { t: 'Real engineering', d: 'Work on transformers and substations that end up powering utilities, factories and cities.' },
  { t: 'Learn the full cycle', d: 'See projects from first drawing through factory testing to energisation on site.' },
  { t: 'Safety first', d: 'Work under an ISO 45001 occupational health and safety system.' },
  { t: 'Grow with us', d: 'Training, mentoring and room to take on more responsibility.' }
];

export const CAREER_AREAS = ['Design & Engineering', 'Manufacturing & Production', 'Testing & Quality', 'Field Service & Commissioning', 'Sales & Project Management', 'Supply Chain & Logistics'];
