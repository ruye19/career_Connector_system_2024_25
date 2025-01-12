import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { post } from './post.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
    constructor(
      @InjectRepository(post) private readonly postRepository: Repository<post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}
async createPost(createpostDto: CreatePostDto, userId:number):Promise <post>{
    const user= await this.userRepository.findOne({where :{id:userId}})
    if (!user){
        throw new Error('user not found')
    }
const posts=this.postRepository.create({...createpostDto,user,})
return this.postRepository.save(posts)
}
async getAllPosts():Promise<post[]>{
    return this.postRepository.find({relations:['user']})

}

}
