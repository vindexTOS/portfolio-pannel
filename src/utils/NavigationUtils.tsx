export class MainNavigation {
  title: string
  link: string
  constructor(title: string, link: string) {
    this.title = title
    this.link = link
  }
}

export const NavigationLinks = [
  new MainNavigation('Blog', 'blog/make'),
  new MainNavigation('Learning', 'learning'),
  new MainNavigation('Skills', 'skills'),
  new MainNavigation('Projects', 'projects'),
  new MainNavigation('About', 'about'),
  new MainNavigation('Themes', 'Themes'),
]

export type NavigationLinkType = {
  title: string
  link: string
}
