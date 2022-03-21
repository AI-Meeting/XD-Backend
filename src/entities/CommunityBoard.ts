import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { CommunityComment } from "./CommunityComment";

@Index("id_UNIQUE", ["id"], { unique: true })
@Index("fk_comunity_board_user1_idx", ["userId"], {})
@Entity("community_board", { schema: "xddb" })
export class CommunityBoard {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("enum", {
    name: "category",
    enum: ["SCHOO", "COMPANY", "INTERVIEW", "ETC"],
  })
  category: "SCHOO" | "COMPANY" | "INTERVIEW" | "ETC";

  @Column("varchar", { name: "content", length: 500 })
  content: string;

  @ManyToOne(() => User, (user) => user.communityBoards, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(
    () => CommunityComment,
    (communityComment) => communityComment.communityBoard
  )
  communityComments: CommunityComment[];
}
