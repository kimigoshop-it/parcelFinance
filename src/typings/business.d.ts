/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
   * - super: 超级管理员(该权限具有所有路由数据)
   * - admin: 管理员
   * - user: 用户
   * - custom: 自定义角色
   */
  type RoleType = keyof typeof import('@/enum').EnumUserRole;

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户角色类型 */
    userRole: RoleType;
  }
}

declare type SystemDictionaryDetail = {
  systemDictionaryId: number;
  dictionaryTypeCode: string;
  state: number;
  dictionaryTag: string;
  dictionaryTagValue: string;
  remark: string;
  id: number;
  delFlag: number;
  createTime: string;
  systemUserId: number | null;
  createTimeString: string | null;
  updateTimeString: string | null;
  updateTime: string;
  createUser: string;
  updateUser: string;
};

declare type BaseQueryParams = {
  pageIndex: number;
  pageSize: number;
  total?: number;
};
