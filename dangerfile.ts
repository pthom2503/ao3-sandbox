import { danger, fail, markdown, message, warn } from "danger"
import jiraIssue from "danger-plugin-jira-issue"

export default async () => {
  const pr = danger.github.pr
  const repoName = pr.base.repo.full_name

  // Actions related to people (welcome, PR count, etc.)

  const prLimit = 5
  const welcomeMessage = `
  # Welcome! :wave:
  Hi, @${pr.user.login}! Thank you for the PR, and your interest
  in the otwarchive project.

  Please take a moment to visit at these helpful links
  * https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/
  * https://github.com/otwcode/otwarchive/blob/master/CONTRIBUTING.md

  If you'd like the ability to comment on, assign, and transition Jira
  issues in the future, you're welcome to create a Jira account!
  You can reply here with the account name and we'll set up the permissions
  for you. (It makes things a bit easier for us on the organizational side
  if the Full Name on your Jira account either matches the name you'd like us
  to credit in the release notes or includes it in parentheses,
  e.g. "Nickname (PREFERRED NAME).")

  Thanks again for contributing! If you have any questions,
  you can contact us at otw-coders@transformativeworks.org.
  `.replace(/\n/, ' ')

  if (pr.author_association === 'FIRST_TIME_CONTRIBUTOR') {
    markdown(welcomeMessage)
  }

  const contributorPRs = await danger.github.api.search.issuesAndPullRequests({
    q: `is:pr is:open author:${pr.user.login} repo:${repoName}`
  })
  const openPRCount = contributorPRs.data.total_count
  if (openPRCount <= prLimit) {
    message(`You have ${openPRCount} PR(s) open of ${prLimit} allowed`)
  } else {
    warn(`You have more than ${prLimit} PRs open! Please wait until some have been merged to open more.`)
  }


  // Checks for Jira things

  if (!pr.title.match(/^AO3\-\d+\s/)) {
    fail('Make sure the Jira issue number is the first thing in your PR title. For example, `AO3-1234 Added some cool new things`.')
  } else {
    jiraIssue({
      key: 'AO3',
      url: 'https://otwarchive.atlassian.net',
      location: 'title',
    })
  }
}
