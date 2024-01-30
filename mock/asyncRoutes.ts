// 模拟后端动态生成路由
import { MockMethod } from "vite-plugin-mock";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const authorityRouter = {
  path: "/authority",
  meta: {
    title: "权限管理",
    icon: "lollipop",
    rank: 9
  },
  children: [
    {
      path: "/authority/user/index",
      name: "UserManager",
      meta: {
        title: "用户管理",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/authority/job/index",
      name: "JobManager",
      meta: {
        title: "职位管理",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/authority/org/index",
      name: "OrgManager",
      meta: {
        title: "组织管理",
        roles: ["admin", "common"]
      }
    }
  ]
};
const permissionRouter = {
  path: "/permission",
  meta: {
    title: "PS管理",
    icon: "lollipop",
    rank: 10
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "页面权限",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "按钮权限",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"]
      }
    }
  ]
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [authorityRouter, permissionRouter]
      };
    }
  }
] as MockMethod[];
