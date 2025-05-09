import type { BaseApi } from "@/shared/api";
import type { User, QueryParams } from "..";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "@/shared/ui/errors";

const STORAGE_KEY = "users";
export const userApiLocalStorage: BaseApi<User> & {
  findAll: () => Promise<{ total: number; data: User[] }>;
} = {
  async findAll() {
    const users = localStorage.getItem(STORAGE_KEY);
    const data: User[] = users ? JSON.parse(users) : getDefaultUserList();
    return { total: data.length, data };
  },
  async findMany(params: QueryParams) {
    const { data: users } = await this.findAll();
    return { total: 0, data: users };
  },
  async findOne(id) {
    const { data: users } = await this.findAll();
    const data = users.find((e) => e.id === id);
    if (!data) throw new NotFoundError();
    return { data };
  },
  async create(user) {
    const { data: users } = await this.findAll();
    const created = { ...user, id: uuidv4() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...users, created]));
    return { data: created };
  },
  async update(updatedUser) {
    const { data: users } = await this.findAll();
    const updated = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { data: updatedUser };
  },
  async remove(id) {
    const { data: users } = await this.findAll();
    const filtered = users.filter((u) => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return { id };
  },
};

function getDefaultUserList(): User[] {
  return [
    {
      id: uuidv4(),
      name: "John Doe",
      address: "서울 강남구",
      memo: " 외국인",
      joinedAt: "2024-10-02",
      job: "개발자",
      agreedToEmail: true,
    },
    {
      id: uuidv4(),
      name: "Foo Bar",
      address: "서울 서초구",
      memo: "한국인",
      joinedAt: "2024-10-01",
      job: "PO",
      agreedToEmail: false,
    },
  ];
}
