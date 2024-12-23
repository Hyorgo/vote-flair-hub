import { Database } from './database'

type PublicSchema = Database['public']

export type Tables<
  T extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  S extends T extends { schema: keyof Database }
    ? keyof Database[T['schema']]['Tables']
    : never = never
> = T extends { schema: keyof Database }
  ? Database[T['schema']]['Tables'][S] extends {
      Row: infer R
    }
    ? R
    : never
  : T extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][T] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  T extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  S extends T extends { schema: keyof Database }
    ? keyof Database[T['schema']]['Tables']
    : never = never
> = T extends { schema: keyof Database }
  ? Database[T['schema']]['Tables'][S] extends {
      Insert: infer I
    }
    ? I
    : never
  : T extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][T] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  T extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  S extends T extends { schema: keyof Database }
    ? keyof Database[T['schema']]['Tables']
    : never = never
> = T extends { schema: keyof Database }
  ? Database[T['schema']]['Tables'][S] extends {
      Update: infer U
    }
    ? U
    : never
  : T extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][T] extends {
      Update: infer U
    }
    ? U
    : never
  : never