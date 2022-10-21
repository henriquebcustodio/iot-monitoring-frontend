interface DataPoint {
  id: number,
  timestamp: string,
  variable_id: number,
  created_at: string,
  updated_at: string,
  value: string | boolean | number
}

export default DataPoint;