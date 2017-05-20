import {Table, Column , PrimaryGeneratedColumn} from "ionic-orm";

@Table()
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @Column("text")
    avatar: string;

    @Column("real")
    latitude: number;

    @Column("real")
    longitude: number;


}
