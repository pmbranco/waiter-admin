const GitUrlParse = require('git-url-parse')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidateGithub = values => {
  const data = GitUrlParse(values.githubRepoURL)
  console.log(data)

  return sleep(500).then(() => {
    if (data.resource !== 'github.com') {
      // eslint-disable-next-line
      throw { githubRepoURL: 'Invalid URL' }
    } else {
      return { owner: data.owner, repo: data.name }
    }
  })
}

export const asyncValidateGitlab = values => {
  const data = GitUrlParse(values.gitlabRepoURL)
  console.log(data)

  return sleep(500).then(() => {
    if (data.resource !== 'git.vpgrp.io') {
      // eslint-disable-next-line
      throw { gitlabRepoURL: 'Invalid URL' }
    } else {
      return {
        owner: data.full_name.substring(0, data.full_name.indexOf('/')),
        repo: data.name.substring(data.name.indexOf('/') + 1),
      }
    }
  })
}
