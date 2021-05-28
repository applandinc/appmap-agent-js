## [3.2.1](https://github.com/applandinc/appmap-agent-js/compare/v3.2.0...v3.2.1) (2021-05-28)


### Bug Fixes

* remove node-version from configuration.childeren ([5d72714](https://github.com/applandinc/appmap-agent-js/commit/5d727143ef7d176b388d7bf252bdf83fef53538a))

# [3.2.0](https://github.com/applandinc/appmap-agent-js/compare/v3.1.2...v3.2.0) (2021-05-28)


### Features

* support for node12 (latest still maintained node version)) ([74d1056](https://github.com/applandinc/appmap-agent-js/commit/74d105687fb4ddce1c99b780f2507df17f997004))

## [3.1.2](https://github.com/applandinc/appmap-agent-js/compare/v3.1.1...v3.1.2) (2021-05-21)


### Bug Fixes

* add ajv schema *yml* ([63de260](https://github.com/applandinc/appmap-agent-js/commit/63de2606eaf92b42d44744cf35a269ad9d4437bc))

## [3.1.1](https://github.com/applandinc/appmap-agent-js/compare/v3.1.0...v3.1.1) (2021-05-21)


### Bug Fixes

* bump to push new npm version ([f4bc231](https://github.com/applandinc/appmap-agent-js/commit/f4bc231f98a14022127deb5a759c713fdc2a457c))

# [3.1.0](https://github.com/applandinc/appmap-agent-js/compare/v3.0.0...v3.1.0) (2021-05-21)


### Bug Fixes

* catch network error (due to ECONRESET) and less globs and more regexp) ([7a14afb](https://github.com/applandinc/appmap-agent-js/commit/7a14afbe5d539226934fc7ea292a30be3bc96092))
* correct a few bugs where the client and the server protocol did not match ([2c44044](https://github.com/applandinc/appmap-agent-js/commit/2c44044d6acb4afdeedc7fbe47b79fd9e6884679))
* fix infinite http recursion and change conf format to conform to initial values ([4ca1ff9](https://github.com/applandinc/appmap-agent-js/commit/4ca1ff9a0e398a8063dd24cbe902f3300b4b5e35))
* test child spawning and correct a few bugs linked to client expect checks ([471b955](https://github.com/applandinc/appmap-agent-js/commit/471b95511b21b9a58f6e6d30437cd7d377a272b7))
* various bug fixes and better seperation of errors between the base and the meta layer ([cc80044](https://github.com/applandinc/appmap-agent-js/commit/cc80044c5b1338b19a6301bb3685299f802388c8))


### Features

* add hook for http request ([3421530](https://github.com/applandinc/appmap-agent-js/commit/34215308f2e8ac5aa2c98da7ff26e917f1bff00c))
* add https hooking ([598d87e](https://github.com/applandinc/appmap-agent-js/commit/598d87e452051a37f11de0501801628753445ec8))
* add inline extends field for configuration and embeded cwd ([e4addf3](https://github.com/applandinc/appmap-agent-js/commit/e4addf3ea837cb6a37fb54feae92e8f179c221c9))
* cosmetic improvements ([eafc86a](https://github.com/applandinc/appmap-agent-js/commit/eafc86a96d123c492ec6f9ceaaeb86b18cf6edec))
* provide more options to the user to spawn child processes ([61522a3](https://github.com/applandinc/appmap-agent-js/commit/61522a3a1809b7abdecddaf4196f854036cd9cc7))

# [3.0.0](https://github.com/applandinc/appmap-agent-js/compare/v2.12.1...v3.0.0) (2021-05-13)


### Bug Fixes

* eslint ([4383c7e](https://github.com/applandinc/appmap-agent-js/commit/4383c7e61eef6983440e0f9b98bf87975aa59493))
* eslint the entire project ([e230a6b](https://github.com/applandinc/appmap-agent-js/commit/e230a6b0ce41e477df4c55e6cf392e41ced94030))
* merge from ci ([615afde](https://github.com/applandinc/appmap-agent-js/commit/615afde4613e1987d1e68f7aff2341440a8b11c9))
* more robust error reporting for configuration throuhg haskell--inspired either ([31b9a68](https://github.com/applandinc/appmap-agent-js/commit/31b9a685342ea8b99000697a85acc50045ddef6a))
* updated instrumentation to new error handling and runtime variables ([f28eefc](https://github.com/applandinc/appmap-agent-js/commit/f28eefccbbe74d8eeeb8046d87fcbb5c58847a7f))


### Features

* add termination for entire dispatcher to ensure appmaps are saved on disk ([c2fb027](https://github.com/applandinc/appmap-agent-js/commit/c2fb027ae727670034feee629fe2d5442df0a87d))
* done refactoring the server still need testing ([f333032](https://github.com/applandinc/appmap-agent-js/commit/f3330328ae19253bc87f7cbe9da9a7410e424311))
* extensive refactoring of the client to support flexible recording ([18974f7](https://github.com/applandinc/appmap-agent-js/commit/18974f78df2506b7cd872a66c559865134002ffe))
* user can now spawn multiple child processes ([c338c29](https://github.com/applandinc/appmap-agent-js/commit/c338c29493d9d83e3d61698ac144be1f9ec14654))


### BREAKING CHANGES

* The way to launch a process-wide client has been modified. The client can now be
recorded through a library as well.

## [2.12.1](https://github.com/applandinc/appmap-agent-js/compare/v2.12.0...v2.12.1) (2021-04-30)


### Performance Improvements

* disabled processes will no longer hook require/import ([1037385](https://github.com/applandinc/appmap-agent-js/commit/103738592c7d69e6ccfc79911952a55d4e6f6399))

# [2.12.0](https://github.com/applandinc/appmap-agent-js/compare/v2.11.0...v2.12.0) (2021-04-29)


### Features

* provide more options to output appmaps ([9046f0e](https://github.com/applandinc/appmap-agent-js/commit/9046f0ee7623351ead2d95140300606712faf5b3))

# [2.11.0](https://github.com/applandinc/appmap-agent-js/compare/v2.10.0...v2.11.0) (2021-04-29)


### Features

* support for glob pattern for the 'enabled' configuration option ([707cc97](https://github.com/applandinc/appmap-agent-js/commit/707cc9703b55042712a5e8e0139c88e3f11bf9bb))

# [2.10.0](https://github.com/applandinc/appmap-agent-js/compare/v2.9.0...v2.10.0) (2021-04-29)


### Bug Fixes

* update build with latest changes ([57b766a](https://github.com/applandinc/appmap-agent-js/commit/57b766a53ff838c7bf5ee1d56ee2f17c7656a92b))


### Features

* it is now possible to disabled recording on process-scale ([8b45199](https://github.com/applandinc/appmap-agent-js/commit/8b45199b37cf34e6625c2a8623501dcd105b21e1))

# [2.9.0](https://github.com/applandinc/appmap-agent-js/compare/v2.8.1...v2.9.0) (2021-04-28)


### Features

* cache to prevent appmaps from overwritting themselves and add default map name ([8724059](https://github.com/applandinc/appmap-agent-js/commit/8724059609d1c63be684f747ff1193e9ed5937a1))

## [2.8.1](https://github.com/applandinc/appmap-agent-js/compare/v2.8.0...v2.8.1) (2021-04-28)


### Bug Fixes

* remove legacy code dependent on node's argument rather than NODE_OPTIONS ([0ce1b42](https://github.com/applandinc/appmap-agent-js/commit/0ce1b427a1c1b5e936d40fd5e1f367aa7a00dbbc))

# [2.8.0](https://github.com/applandinc/appmap-agent-js/compare/v2.7.1...v2.8.0) (2021-04-28)


### Features

* use NODE_OPTIONS instead of node's argv which provides automatic support for child_process ([b9c1dd3](https://github.com/applandinc/appmap-agent-js/commit/b9c1dd3c7a8ca6ecc8dd63ee31f8f58f2db4c12c))

## [2.7.1](https://github.com/applandinc/appmap-agent-js/compare/v2.7.0...v2.7.1) (2021-04-28)


### Bug Fixes

* fix argv processing in bin/index ([bab6a53](https://github.com/applandinc/appmap-agent-js/commit/bab6a5315f625c5b320739c69e1c4e4f4f0e6062))

# [2.7.0](https://github.com/applandinc/appmap-agent-js/compare/v2.6.0...v2.7.0) (2021-04-28)


### Bug Fixes

* merge from ci ([f0940f6](https://github.com/applandinc/appmap-agent-js/commit/f0940f647de9a980993c68b16c66d997352c6819))


### Features

* better handling of node version to diagnose requirements issue ([cd900ac](https://github.com/applandinc/appmap-agent-js/commit/cd900acb330fdb0ecd68bd2403bf35ef5377c779))

# [2.6.0](https://github.com/applandinc/appmap-agent-js/compare/v2.5.0...v2.6.0) (2021-04-27)


### Features

* improved command line interface ([5ed31b4](https://github.com/applandinc/appmap-agent-js/commit/5ed31b45c43f656f043d6389b33d48928eaea228))

# [2.5.0](https://github.com/applandinc/appmap-agent-js/compare/v2.4.0...v2.5.0) (2021-04-22)


### Bug Fixes

* pull from alpha ([a8b4d11](https://github.com/applandinc/appmap-agent-js/commit/a8b4d116a80aa92df6d10eb981f8cb624db17938))


### Features

* all metadata are now included in config and initialization query provides more info ([cc4640f](https://github.com/applandinc/appmap-agent-js/commit/cc4640fe855f7e44dda38d7b595f5b9eceec17b8))

# [2.4.0](https://github.com/applandinc/appmap-agent-js/compare/v2.3.0...v2.4.0) (2021-04-21)


### Features

* propagate hook-child-process cli argument to forked processes ([ea6af3b](https://github.com/applandinc/appmap-agent-js/commit/ea6af3bb80ebd1e1322f224090154773e4f667e2))

# [2.3.0](https://github.com/applandinc/appmap-agent-js/compare/v2.2.0...v2.3.0) (2021-04-21)


### Features

* child_process methods can now be hooked so that their spawn processes are also instrumented ([f34132b](https://github.com/applandinc/appmap-agent-js/commit/f34132b3511f2352e84e4ed03c82f4a7a689aa55))

# [2.2.0](https://github.com/applandinc/appmap-agent-js/compare/v2.1.2...v2.2.0) (2021-04-20)


### Bug Fixes

* update remaining of the application to new configuration feature ([6fed62b](https://github.com/applandinc/appmap-agent-js/commit/6fed62bae809114e828dd49a978f71f655bb3360))


### Features

* add support for package listing and exclusions and use json schema validator ([ffa3c3f](https://github.com/applandinc/appmap-agent-js/commit/ffa3c3f06d92dc1ce461312f4151b058cbb198e3))

## [2.1.2](https://github.com/applandinc/appmap-agent-js/compare/v2.1.1...v2.1.2) (2021-04-19)


### Bug Fixes

* update posix-socket-messaging ([625fd8c](https://github.com/applandinc/appmap-agent-js/commit/625fd8c9649a71e005fbb9f3f53a04231e28b616))

## [2.1.1](https://github.com/applandinc/appmap-agent-js/compare/v2.1.0...v2.1.1) (2021-04-15)


### Bug Fixes

* path to bin ([e537164](https://github.com/applandinc/appmap-agent-js/commit/e537164321d48ef27174eeb002f42f8ea435d3d7))

# [2.1.0](https://github.com/applandinc/appmap-agent-js/compare/v2.0.1...v2.1.0) (2021-04-15)


### Bug Fixes

* eslint ([b44cf23](https://github.com/applandinc/appmap-agent-js/commit/b44cf23d1b1bc94d8efdd2e768d3396e94c49e74))
* rely on more comptible curl options ([b501a8d](https://github.com/applandinc/appmap-agent-js/commit/b501a8da315130f767fea11d7158beb4910b62de))
* run eslint and prettier ([93b34f8](https://github.com/applandinc/appmap-agent-js/commit/93b34f81a4d8fae285db36c919a0aea5fc516875))
* run eslint and prettier ([266fe27](https://github.com/applandinc/appmap-agent-js/commit/266fe271bf56d99a8a8bca3a93a82f792472b84d))


### Features

* added new communication channel between server and client ([35a7ff0](https://github.com/applandinc/appmap-agent-js/commit/35a7ff046a1da43f604ea59548c7b049cdf19cd3))
* replace fork channel by messaging channel ([31e85c2](https://github.com/applandinc/appmap-agent-js/commit/31e85c29c18323f98535518bac0218ab077f06dc))


### Performance Improvements

* http optimized empty body when null return ([d3be7ec](https://github.com/applandinc/appmap-agent-js/commit/d3be7ecbe62293a9817f5d4f4868fea05df6336e))

## [2.0.1](https://github.com/applandinc/appmap-agent-js/compare/v2.0.0...v2.0.1) (2021-04-04)


### Bug Fixes

* correct outdated global variable (PROCESS_ID and SEND) ([a784eaa](https://github.com/applandinc/appmap-agent-js/commit/a784eaa4f158c3a76e18728a0a5d279a17c4316d))

# [2.0.0](https://github.com/applandinc/appmap-agent-js/compare/v1.0.2...v2.0.0) (2021-04-04)


### Bug Fixes

* added current env variables to spawn inline client which is necessary for PATH) ([dc4224e](https://github.com/applandinc/appmap-agent-js/commit/dc4224ec14de9b53eed4228432fecf855cddb9ec))
* correct some erroneous appmap methods ([4361823](https://github.com/applandinc/appmap-agent-js/commit/43618230c997562d49b4710b08c8f32a07f4514b))
* fix inversion argument between client and server for instrument query and lint-related fixes ([2148505](https://github.com/applandinc/appmap-agent-js/commit/21485053534e116d37597662a6a54f7ea6f2d67c))
* forgot some files in the big refactoring commit ([aef71ed](https://github.com/applandinc/appmap-agent-js/commit/aef71ed1fe61b8396d8dcf5266c669d3ab1c6d42))
* lint all ([23471dd](https://github.com/applandinc/appmap-agent-js/commit/23471dd4810fff1ea33f4e8ca3b3e01c8ab10fa2))
* lint lib ([3b6a05b](https://github.com/applandinc/appmap-agent-js/commit/3b6a05b4004f5913963a3b208f3d8642a62d6ca5))
* more linent test on current repostory url (failed with travis)) ([24dd21b](https://github.com/applandinc/appmap-agent-js/commit/24dd21b6341d28b9d8abb3e55db752f6d206728c))
* start testing the client ([c581b88](https://github.com/applandinc/appmap-agent-js/commit/c581b880710120588bf315e9a44d36072cf0b607))


### Features

* config system is now more flexible ([465a918](https://github.com/applandinc/appmap-agent-js/commit/465a918b7d688d4a12c225a1235ac6f716e9b463))
* easier bin call ([86f1b6d](https://github.com/applandinc/appmap-agent-js/commit/86f1b6ddb772803fb0291fe0dacc6d4221845d78))
* implement hooks for commonjs and native modules and refactor the architecture ([14d1cee](https://github.com/applandinc/appmap-agent-js/commit/14d1cee56c2aa6e81f3b270a12673c026778b22e))


### BREAKING CHANGES

* Some old environment variables no longer work
* The way the agent is invoked is completely changed

## [1.0.2](https://github.com/applandinc/appmap-agent-js/compare/v1.0.1...v1.0.2) (2021-03-30)


### Bug Fixes

* add hashbang to bin ([0219d9e](https://github.com/applandinc/appmap-agent-js/commit/0219d9e7de3825c92af3f4a1f9c86d7d3e0bddf1))

## [1.0.1](https://github.com/applandinc/appmap-agent-js/compare/v1.0.0...v1.0.1) (2021-03-30)


### Bug Fixes

* added bin to package json ([6ac7995](https://github.com/applandinc/appmap-agent-js/commit/6ac7995797bd394c04b19764b39b0bfdacd23ae6))

# 1.0.0 (2021-03-30)


### Features

* match appmap name with target file name ([4619f3d](https://github.com/applandinc/appmap-agent-js/commit/4619f3da443085c8b42f2145d4d865805ba0b8ab))
