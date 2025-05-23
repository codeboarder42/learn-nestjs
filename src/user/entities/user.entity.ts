import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';
import { Role } from 'src/guards/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: true, type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  roles: Role[];
}
