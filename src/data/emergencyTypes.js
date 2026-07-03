/**
 * MedRoute — Emergency Type Definitions
 * Maps each emergency category to the required facility capabilities.
 */

const emergencyTypes = [
  {
    id: 'road_accident',
    label: 'Road Accident',
    icon: 'Car',
    color: '#E63946',
    description: 'Vehicle collision, pedestrian impact, or road trauma requiring immediate surgical intervention.',
    requiredCapabilities: ['Trauma Care', 'Emergency Surgery', 'ICU', 'Blood Bank'],
  },
  {
    id: 'pregnancy',
    label: 'Pregnancy',
    icon: 'Baby',
    color: '#E07BE0',
    description: 'Labour complications, eclampsia, haemorrhage, or any obstetric emergency.',
    requiredCapabilities: ['Obstetrics', 'Neonatal Care', 'Blood Bank'],
  },
  {
    id: 'heart_attack',
    label: 'Heart Attack',
    icon: 'HeartPulse',
    color: '#D62828',
    description: 'Chest pain, cardiac arrest, or suspected myocardial infarction.',
    requiredCapabilities: ['Cardiology', 'ICU', '24-Hour Emergency'],
  },
  {
    id: 'stroke',
    label: 'Stroke',
    icon: 'Brain',
    color: '#7B2D8E',
    description: 'Sudden numbness, confusion, speech difficulty, or loss of coordination.',
    requiredCapabilities: ['Neurology', 'CT Scan', 'ICU'],
  },
  {
    id: 'snake_bite',
    label: 'Snake Bite',
    icon: 'Bug',
    color: '#2D6A4F',
    description: 'Venomous snake bite requiring immediate antivenom administration.',
    requiredCapabilities: ['Snake Antivenom', '24-Hour Emergency'],
  },
  {
    id: 'burns',
    label: 'Burns',
    icon: 'Flame',
    color: '#F77F00',
    description: 'Severe thermal, chemical, or electrical burns requiring specialist care.',
    requiredCapabilities: ['Burn Unit', 'ICU', 'Emergency Surgery'],
  },
  {
    id: 'poisoning',
    label: 'Poisoning',
    icon: 'FlaskConical',
    color: '#6A0572',
    description: 'Ingestion of toxic substances, drug overdose, or chemical exposure.',
    requiredCapabilities: ['ICU', '24-Hour Emergency', 'Dialysis'],
  },
  {
    id: 'paediatric',
    label: 'Paediatric',
    icon: 'Baby',
    color: '#00B4D8',
    description: 'Child medical emergency — high fever, seizures, breathing difficulty, or injury.',
    requiredCapabilities: ['Neonatal Care', '24-Hour Emergency'],
  },
  {
    id: 'general',
    label: 'General Emergency',
    icon: 'Siren',
    color: '#457B9D',
    description: 'Any other medical emergency not covered by specific categories.',
    requiredCapabilities: ['24-Hour Emergency'],
  },
];

export default emergencyTypes;
