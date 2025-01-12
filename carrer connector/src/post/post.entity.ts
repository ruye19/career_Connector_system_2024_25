import { Entity,PrimaryGeneratedColumn,Column,ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "src/user/user.entity";

@Entity('post')
export class post{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    description:string
     @Column()
      experienceRange: string;
    @Column()
  wantedSalary: number;
   @Column()
  cv: string;
   @ManyToOne(() => User, (user) => user.posts)
  user: User;  


    
    

}
