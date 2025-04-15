import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pollution_records')
export class PollutionRecord {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    timestamp: string;

  @Column()
    city: string;

  @Column()
    state: string;

  @Column()
    country: string; 

  @Column()
    aqius: number;

  @Column()
    mainus: string;

  @Column()
    aqicn: number;

  @Column()
    maincn: string;
}
