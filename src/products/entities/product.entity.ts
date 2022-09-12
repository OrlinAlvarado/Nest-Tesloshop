import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products'})
export class Product {
    @ApiProperty({
        example: '1cd4ff47-3f71-4d07-b32b-85ebf08d55e6',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
    })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({
        example: 0.00,
        description: 'Product Price',
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'New Tshirt',
        description: 'Product Description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product Stuck',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M', 'XL', 'XXL'],
        description: 'Product Sizes',
        required: true
    })
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({
        example: 'woman',
        description: 'Product gender',
    })
    @ApiProperty()
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () =>  ProductImage,
        (productImage) => productImage.product,
        {
            cascade: true,
            eager: true
        }
    )
    images?: ProductImage[]
    
    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: User
     
    @BeforeInsert()
    @BeforeUpdate()    
    checkSlug() {
        if ( !this.slug ) {
            this.slug = this.title
        }
        
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
    
}
