import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Option } from './Option'
import * as types from '@/types'
import { PapyrEntity } from './PapyrEntity'

@Entity()
export class Settings extends PapyrEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string

  @Column()
  @Index({ unique: true })
  name!: string

  @ManyToOne(() => Option, (option) => option.settings, {
    onDelete: 'CASCADE',
  })
  options!: Option[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  async toModel(): Promise<types.Settings> {
    const optionEntities = await Option.find({
      where: {
        settingsId: this.id,
      },
    })
    const options = optionEntities.reduce((options, option) => {
      options[option.key] = option.getParsedValue()
      return options
    }, {} as Record<string, any>)

    return {
      id: this.id,
      name: this.name,
      options,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }
}
