1.  同步 master - git pull origin master

2.  rebase 到 最新 master - git rebase master branch_name

3.  checkout 一个 release 分支 - git checkout -b release-xx

4.  push release 分支 到 远程库 - git push -u origin release-xx

5.  访问远程库[merge_request](http://git.cnsuning.com/ux/uxcool-lerna/merge_requests/new), 合并新提交的 release 分支到 master

6.  同步 master 分支, 发布代码
