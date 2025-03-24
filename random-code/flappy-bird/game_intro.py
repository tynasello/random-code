from game_loop import *


def game_intro():
    pygame.display.set_caption("Main Menu")
    bg_intro = pygame.image.load('media/bg_intro.jpg')
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
        screen.fill([255, 255, 255])
        title_text = pygame.font.SysFont('arial.ttf', 60)
        text_surf = title_text.render("Flappy Bird", True, ([32, 32, 32]))
        text_rect = text_surf.get_rect()
        text_rect.center = ((screenW / 2), 200)
        screen.blit(bg_intro, (0, 0))
        screen.blit(text_surf, text_rect)

        # creating buttons using button function
        button("Start", (screenW / 2 - 75), 300, 115, 40, ([153, 230, 153]), ([71, 209, 71]), "play")
        button("Quit", (screenW / 2 - 75), 365, 115, 40, ([255, 153, 153]), ([230, 0, 0]), "quit")

        pygame.display.update()
        clock.tick(15)
