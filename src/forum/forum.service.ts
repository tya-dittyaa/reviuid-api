import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateForumChildDto, CreateForumParentDto } from './dto';

@Injectable()
export class ForumService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async totalParent() {
    return await this.prismaService.forumParent.count();
  }

  async totalChildren(parentId: string) {
    // Check if parent ID is provided
    if (!parentId) {
      throw new NotFoundException('Parent ID is required');
    }

    // Check if parent exists
    const parent = await this.prismaService.forumParent.findUnique({
      where: {
        id: parentId,
      },
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Return total children
    return await this.prismaService.forumChild.count({
      where: {
        forum_parent_id: parentId,
      },
    });
  }

  async createParent(userId: string, dto: CreateForumParentDto) {
    // Check if user exists
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create forum parent
    const parent = await this.prismaService.forumParent.create({
      data: {
        title: dto.title,
        content: dto.content,
        user_id: userId,
      },
    });

    // Return success message
    return {
      message: 'Forum parent created successfully',
      parentId: parent.id,
    };
  }

  async createChild(userId: string, dto: CreateForumChildDto) {
    // Check if user exists
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if parent exists
    const checkParent = await this.prismaService.forumParent.findUnique({
      where: {
        id: dto.forum_parent_id,
      },
    });
    if (!checkParent) {
      throw new NotFoundException('Parent not found');
    }

    // Create forum child
    await this.prismaService.forumChild.create({
      data: {
        content: dto.content,
        user_id: userId,
        forum_parent_id: dto.forum_parent_id,
      },
    });
  }

  async displayForumParentById(parentId: string) {
    // Check if parent ID is provided
    if (!parentId) {
      throw new NotFoundException('Parent ID is required');
    }

    // Check if parent exists
    const parent = await this.prismaService.forumParent.findUnique({
      where: {
        id: parentId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    return parent;
  }

  async displayForumParentByPage(page: number) {
    if (!page) {
      throw new BadRequestException('Page number is required');
    }

    if (isNaN(page)) {
      throw new BadRequestException('Invalid page number');
    }

    if (page < 1) {
      throw new BadRequestException('Page number must be greater than 0');
    }

    const parents = await this.prismaService.forumParent.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return parents;
  }

  async displayForumParentBySearch(search: string) {
    const parents = await this.prismaService.forumParent.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      take: 10,
    });

    return parents;
  }

  async displayForumChildById(childId: string) {
    // Check if child ID is provided
    if (!childId) {
      throw new NotFoundException('Child ID is required');
    }

    // Check if child exists
    const child = await this.prismaService.forumChild.findUnique({
      where: {
        id: childId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    if (!child) {
      throw new NotFoundException('Child not found');
    }

    return child;
  }

  async displayForumChildByParentId(parentId: string, page: number) {
    // Check if parent ID is provided
    if (!parentId) {
      throw new NotFoundException('Parent ID is required');
    }

    // Check if parent exists
    const parent = await this.prismaService.forumParent.findUnique({
      where: {
        id: parentId,
      },
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Check if page is provided
    if (!page) {
      throw new BadRequestException('Page number is required');
    }

    // Check if page is invalid
    if (isNaN(page)) {
      throw new BadRequestException('Invalid page number');
    }

    // Check if page is less than 1
    if (page < 1) {
      throw new BadRequestException('Page number must be greater than 0');
    }

    // Get children
    const children = await this.prismaService.forumChild.findMany({
      where: {
        forum_parent_id: parentId,
      },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return children;
  }

  async updateForumParent(
    userId: string,
    parentId: string,
    dto: CreateForumParentDto,
  ) {
    // Check if user exists
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if parent ID is provided
    if (!parentId) {
      throw new NotFoundException('Parent ID is required');
    }

    // Check if parent exists
    const parent = await this.prismaService.forumParent.findUnique({
      where: {
        id: parentId,
      },
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Check if user is the owner
    if (parent.user_id !== userId) {
      throw new BadRequestException('You are not the owner of this parent');
    }

    // Update parent
    await this.prismaService.forumParent.update({
      where: {
        id: parentId,
      },
      data: {
        title: dto.title,
        content: dto.content,
      },
    });

    // Return success message
    return {
      message: 'Forum parent updated successfully',
    };
  }

  async deleteForumParent(userId: string, parentId: string) {
    // Check if user exists
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if parent ID is provided
    if (!parentId) {
      throw new NotFoundException('Parent ID is required');
    }

    // Check if parent exists
    const parent = await this.prismaService.forumParent.findUnique({
      where: {
        id: parentId,
      },
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Check if user is the owner
    if (parent.user_id !== userId) {
      throw new BadRequestException('You are not the owner of this parent');
    }

    // Delete children
    await this.prismaService.forumChild.deleteMany({
      where: {
        forum_parent_id: parentId,
      },
    });

    // Delete parent
    await this.prismaService.forumParent.delete({
      where: {
        id: parentId,
      },
    });

    // Return success message
    return {
      message: 'Forum parent deleted successfully',
    };
  }

  async updateForumChild(userId: string, childId: string, content: string) {
    // Check if user exists
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if child ID is provided
    if (!childId) {
      throw new NotFoundException('Child ID is required');
    }

    // Check if child exists
    const child = await this.prismaService.forumChild.findUnique({
      where: {
        id: childId,
      },
    });
    if (!child) {
      throw new NotFoundException('Child not found');
    }

    // Check if user is the owner
    if (child.user_id !== userId) {
      throw new BadRequestException('You are not the owner of this child');
    }

    // Update child
    await this.prismaService.forumChild.update({
      where: {
        id: childId,
      },
      data: {
        content,
      },
    });

    // Return success message
    return {
      message: 'Forum child updated successfully',
    };
  }

  async deleteForumChild(userId: string, childId: string) {
    // Check if user exists
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if child ID is provided
    if (!childId) {
      throw new NotFoundException('Child ID is required');
    }

    // Check if child exists
    const child = await this.prismaService.forumChild.findUnique({
      where: {
        id: childId,
      },
    });
    if (!child) {
      throw new NotFoundException('Child not found');
    }

    // Check if user is the owner
    if (child.user_id !== userId) {
      throw new BadRequestException('You are not the owner of this child');
    }

    // Delete child
    await this.prismaService.forumChild.delete({
      where: {
        id: childId,
      },
    });

    // Return success message
    return {
      message: 'Forum child deleted successfully',
    };
  }
}
