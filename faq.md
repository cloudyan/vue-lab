# 问题


## mac 下 npm install 报警告错误

```bash
> fsevents@1.2.11 install /Users/dwd/github/dwdjs/vue/vue.labs/node_modules/fsevents
> node-gyp rebuild

No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/Users/dwd/.nvm/versions/node/v12.13.0/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:210:5)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:272:12)
gyp ERR! System Darwin 19.2.0
gyp ERR! command "/Users/dwd/.nvm/versions/node/v12.13.0/bin/node" "/Users/dwd/.nvm/versions/node/v12.13.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/dwd/github/dwdjs/vue/vue.labs/node_modules/fsevents
gyp ERR! node -v v12.13.0
gyp ERR! node-gyp -v v5.0.5
gyp ERR! not ok
```

说是没 Xcode , 但是我机器安装了啊

本机暂未解决掉

参考:

- https://stackoverflow.com/questions/15371925/how-to-check-if-command-line-tools-is-installed
