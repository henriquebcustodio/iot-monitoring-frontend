interface Variable {
  id: number;
  name: string;
  label: string;
  description: string;
  variableType: 'numeric' | 'boolean' | 'text';
  deviceId: number;
  createdAt: string;
  updatedAt: string;
}

export default Variable;