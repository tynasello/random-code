from entities import *


# creates buttons for start and quit
def button(txt, x, y, w, h, hover, col, task):
    cursor = pygame.mouse.get_pos()
    clicked = pygame.mouse.get_pressed()

    # hovering over buttons
    if x + w > cursor[0] > x and y + h > cursor[1] > y:
        pygame.draw.rect(screen, hover, (x, y, w, h))
        if clicked[0] == 1 and task is not None:
            if task == "play":
                game_loop_()
            elif task == "quit":
                pygame.quit()
                quit()
    else:
        pygame.draw.rect(screen, col, (x, y, w, h))

    button_text = pygame.font.SysFont('arial.ttf', 20)
    start_surf = button_text.render(txt, True, ([0, 0, 0]))
    text_rect = start_surf.get_rect()
    text_rect.center = ((x + (w / 2)), (y + (h / 2)))
    screen.blit(start_surf, text_rect)


def game_over(score):
    pygame.display.set_caption("Game Over")
    bg_intro = pygame.image.load('media/bg_intro.jpg')
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
        screen.fill([255, 255, 255])
        title_text = pygame.font.SysFont('arial.ttf', 60)
        text_surf = title_text.render(("Score: " + str(floor(score))), True, ([32, 32, 32]))
        text_rect = text_surf.get_rect()
        text_rect.center = ((screenW / 2), 200)
        screen.blit(bg_intro, (0, 0))
        screen.blit(text_surf, text_rect)

        # creating buttons using button function
        button("Play Again", (screenW / 2 - 60), 300, 115, 40, ([153, 230, 153]), ([71, 209, 71]), "play")
        button("Quit", (screenW / 2 - 60), 365, 115, 40, ([255, 153, 153]), ([230, 0, 0]), "quit")

        pygame.display.update()
        clock.tick(15)


def game_loop_():
    pygame.mixer.music.load("media/game_music.mp3")
    pygame.mixer.music.play(loops=-1)
    game_over_sound = pygame.mixer.Sound("media/game_over.ogg")

    bg = pygame.image.load('media/bg.png')

    # custom event for adding new pipe every 600 milliseconds
    add_pipe = pygame.USEREVENT + 1
    pygame.time.set_timer(add_pipe, 600)

    # instantiate player and enemies and create groups for all sprites and enemy sprite specifically
    player = Player()
    enemies = pygame.sprite.Group()
    all_sprites = pygame.sprite.Group()
    all_sprites.add(player)

    score = 0
    while True:
        player.gravity()
        for action in pygame.event.get():
            if action.type == add_pipe:
                top_enemy = TopPipe()
                bottom_enemy = BottomPipe()
                enemies.add(top_enemy, bottom_enemy)
                all_sprites.add(top_enemy, bottom_enemy)

        pressed_keys = pygame.key.get_pressed()
        player.reset()
        if pressed_keys[K_SPACE]:
            player.update(pressed_keys)

        enemies.update()

        # background image
        screen.fill([0, 0, 0])
        screen.blit(bg, (0, 0))

        # update score
        score += .1
        pygame.display.set_caption("Score: " + str(floor(score)))

        for entity in all_sprites:
            screen.blit(entity.surf, entity.rect)

        if pygame.sprite.spritecollideany(player, enemies):
            player.kill()
            game_over_sound.play()
            pygame.mixer.music.stop()
            time.sleep(1)
            game_over(score)
        pygame.display.flip()
        clock.tick(20)
    pygame.mixer.quit()
    pygame.quit()
