import pygame
import random
from math import floor
import time
from pygame.locals import *


screenW = 800
screenH = 600

pygame.init()
pygame.mixer.init()
pygame.font.init()

screen = pygame.display.set_mode((screenW, screenH))
clock = pygame.time.Clock()

jump_sound = pygame.mixer.Sound("media/birdjump.ogg")


class Player(pygame.sprite.Sprite):

    def __init__(self):
        super(Player, self).__init__()
        self.surf = pygame.image.load('media/bird.png').convert_alpha()
        self.rect = self.surf.get_rect(
            center=(
                60, screenH / 2
            )
        )

    def gravity(self):
        self.rect.move_ip(0, 4)

    def reset(self):
        self.surf = pygame.image.load('media/birdj.png').convert_alpha()

    def update(self, key_pressed):
        # Jumping
        if key_pressed[K_SPACE]:
            jump_sound.play()
            self.rect.move_ip(0, -25)
            self.surf = pygame.image.load('media/bird.png').convert_alpha()
        # make sure bird stays on screen
        if self.rect.left < 0:
            self.rect.left = 0
        if self.rect.right > screenW:
            self.rect.right = screenW
        if self.rect.top <= 0:
            self.rect.top = 0
        if self.rect.bottom >= screenH:
            self.rect.bottom = screenH


class TopPipe(pygame.sprite.Sprite):
    def __init__(self):
        super(TopPipe, self).__init__()
        self.surf = pygame.image.load('media/pipedownu.png').convert_alpha()
        self.rect = self.surf.get_rect(
            center=(
                (screenW + 50),
                random.randint(0, screenH - 500)
            )
        )
        self.speed = 15

    def update(self):
        self.rect.move_ip(-self.speed, 0)
        # make sure pipe disappears when passes left side of screen
        if self.rect.right < 0:
            self.kill()


class BottomPipe(pygame.sprite.Sprite):
    def __init__(self):
        super(BottomPipe, self).__init__()
        self.surf = pygame.image.load('media/pipeupu.png').convert_alpha()
        self.rect = self.surf.get_rect(
            center=(
                (screenW + 50),
                random.randint(screenH - 100, screenH)
            )
        )
        self.speed = 15

    def update(self):
        self.rect.move_ip(-self.speed, 0)
        if self.rect.right < 0:
            self.kill()
