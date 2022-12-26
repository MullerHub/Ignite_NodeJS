interface ICreateCarDTO {
  name: string
  category_id: string
  description: string
  brand: string
  daily_rate: number
  fine_amount: number
  license_plate: string
}

export { ICreateCarDTO }