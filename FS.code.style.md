- 一個路由頁面為一個 `ngModule`，文件名以`[頁面名稱]-management`的形式構成，文件夾置於`app`目錄下。
- 頁面的`ngModule`資料夾內，包含：

1. `[頁面名稱]-management.module.ts`，其中包含了所有該 module 中使用到的 Angular 內建 module 和第三方 module。聲明了該 module 中用到的所有 component。
2. `[頁面名稱]-management.models.ts`，其中以`namespace`的組織方式導出了該 module 內用到的所有公共`interface`。
3. `[頁面名稱]-management-routing.models.ts`，其中定義了該 module 內使用到的子路由。
4. `index.js` AKA `barrel` file。重新導出所有`[頁面名稱]-management.module.ts`中的內容。
5. `components`資料夾，存放所有該 module 中用到的組件。每個組件放在同名的目錄下。其中頁面組件命名為`index`組件，該組件不需要`CSS selector`。如果該頁面使用到了`Ngrx`的`componentStore`，也放在`index`目錄下取名為`index.store.ts`。使用`.gitkeep`確保 components 目錄在沒有內容的情況下也包含進`git`，
