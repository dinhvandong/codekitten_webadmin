/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

import NotificationsPage from "views/Notifications/Notifications.js";
import Project from "views/Project/Project";
import ImageList from "views/ImageList/ImageList";
import SoundList from "views/SoundList/SoundList";
import SpriteList from "views/SpriteList/SpriteList";
import BackDropList from "views/BackDropList/BackDropList";

const dashboardRoutes = [
  {
    path: "/project",
    name: "Dự án",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Project,
    layout: "/admin"
  },
  {
    path: "/image",
    name: "Hình ảnh",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ImageList,
    layout: "/admin"
  },
  {
    path: "/sound",
    name: "Âm thanh",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: SoundList,
    layout: "/admin"
  },
  {
    path: "/sprite",
    name: "Nhân vật",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: SpriteList,
    layout: "/admin"
  },
  {
    path: "/backdrop",
    name: "Hình nền",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: BackDropList,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Thông báo",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
