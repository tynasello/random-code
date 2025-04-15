use std::cmp::max;

use minifb::{Key, Window, WindowOptions};

const WINDOW_WIDTH: usize = 600;
const WINDOW_HEIGHT: usize = 600;

// Distance from camera to 2D origin
const FOV: f32 = 7.0;

#[derive(Copy, Clone)]
enum Color {
    BLACK = 0,
    WHITE = (255 << 16) | (255 << 8) | 255,
    RED = 255 << 16,
    GREEN =  255 << 8,
    // BLUE = 255
}

// Right in x, up in y, out of screen in z are positive
struct Point3D { 
    x: f32,
    y: f32,
    z: f32,
    color: Color
}

impl Point3D {
    fn project_to_2d(&self) -> Point2D {
        return Point2D {
            x: self.x * FOV / (FOV - self.z),
            y: self.y * FOV / (FOV - self.z),
            color: self.color,
        }
    }

    fn translate(&mut self, x: f32, y: f32, z: f32) -> &mut Self {
        self.x = self.x + x;
        self.y = self.y + y;
        self.z = self.z + z;
        self
    }

    fn rotate_x(&self, a: f32) -> Self {
        return Self {
            x: self.x,
            y: self.y * f32::cos(a) + self.z * -f32::sin(a),
            z: self.y * f32::sin(a) + self.z * f32::cos(a),
            color: self.color
        }
    }

    fn rotate_y(&self, a: f32) -> Self {
        return Self {
            x: self.x * f32::cos(a) + self.z * f32::sin(a),
            y: self.y,
            z: self.x * -f32::sin(a) + self.z * f32::cos(a),
            color: self.color
        }
    }

    fn rotate_z(&self, a: f32) -> Self {
        return Self {
            x: self.x * f32::cos(a) + self.y * -f32::sin(a),
            y: self.x * f32::sin(a) + self.y * f32::cos(a),
            z: self.z,
            color: self.color
        }
    }
}

struct Point2D { 
    x: f32,
    y: f32,
    color: Color
}

impl Point2D {
    fn scale(&mut self, f: f32) -> &mut Self {
        self.x = self.x * f;
        self.y = self.y * f;
        self
    }

    fn translate(&mut self, x: f32, y: f32) -> &mut Self {
        self.x = self.x + x;
        self.y = self.y + y;
        self
    }
}

struct Line2D<'a> {
    a: &'a Point2D,
    b: &'a Point2D,
    color: Color
}

struct Screen {
    window: Window,
    buffer: Vec<u32>
}

impl Screen {
    fn build() -> Self {
        let mut window = Window::new(
            "Pixel Renderer - Press ESC to exit",
            WINDOW_WIDTH,
            WINDOW_HEIGHT,
            WindowOptions::default(),
        )
        .unwrap_or_else(|e| {
            panic!("Unable to open window: {}", e);
        });
    
        window.set_target_fps(1000);

        let buffer = vec![Color::BLACK as u32; WINDOW_WIDTH * WINDOW_HEIGHT];

        Self {
            window,
            buffer
        }
    }

    fn refresh(&mut self) {
        self.window.update_with_buffer(&self.buffer, WINDOW_WIDTH, WINDOW_HEIGHT).unwrap();
    }

    fn clear(&mut self) {
        for p in &mut self.buffer {
            *p = Color::BLACK as u32;
        }
    }

    fn point_in_window(&self, p: &Point2D) -> bool {
        p.x >= 0.0 && p.x < WINDOW_WIDTH as f32 && p.y >= 0.0 && p.y < WINDOW_HEIGHT as f32
    }

    fn draw_point(&mut self, p: &Point2D) {
        // Origin at bottom left of screen

        if self.point_in_window(p) {
            let x = p.x as u32;
            let y = p.y as u32;
            let color = p.color as u32;

            self.buffer[(WINDOW_HEIGHT - 1 - y as usize) * WINDOW_WIDTH + (x as usize)] = color;
        }
    }

    fn draw_line(&mut self, line: &Line2D) {
        if !self.point_in_window(line.a) || !self.point_in_window(line.b) {()}

        let dx = (line.b.x - line.a.x).abs();
        let dy = (line.b.y - line.a.y).abs();

        let step = max(dx as u32, dy as u32);

        if step == 0 {()}

        let x_step = dx / step as f32 * if line.a.x < line.b.x {1.0} else {-1.0}; 
        let y_step = dy / step as f32 * if line.a.y < line.b.y {1.0} else {-1.0}; 

        for i in 0..step+1 {
            self.draw_point(
                &Point2D {
                    x: line.a.x + x_step * i as f32,
                    y: line.a.y + y_step * i as f32,
                    color: line.color
                }
            );
        }

        // Bresenham's line algorithm
        
        // let mut x0 = line.a.x as i32;
        // let mut y0 = line.a.y as i32;
        // let x1 = line.b.x as i32;
        // let y1 = line.b.y as i32;
        
        // let sx = if x0 < x1 { 1 } else { -1 };
        // let sy = if y0 < y1 { 1 } else { -1 };

        // let dx = (x1 - x0).abs();
        // let dy = (y1 - y0).abs();
       
        // let mut err = dx - dy;
    
        // loop {
        //     self.draw_point(
        //         &Point2D{
        //             x: x0 as f32, 
        //             y: y0 as f32, 
        //             color: line.color
        //         }
        //     );
            
        //     if x0 == x1 && y0 == y1 {
        //         break;
        //     }

        //     let e2 = 2 * err;

        //     if e2 >= -dy {
        //         err -= dy;
        //         x0 += sx;
        //     }
            
        //     if e2 <= dx {
        //         err += dx;
        //         y0 += sy;
        //     }
        // }
    }
}

fn main() {
    let mut screen = Screen::build();

    let mut cube: Vec<Point3D> = vec!(
        Point3D {x: -1.0, y: -1.0, z: 1.0, color: Color::GREEN},
        Point3D {x: 1.0, y: -1.0, z: 1.0, color: Color::GREEN},
        Point3D {x: -1.0, y: 1.0, z: 1.0, color: Color::GREEN},
        Point3D {x: 1.0, y: 1.0, z: 1.0, color: Color::GREEN},
        Point3D {x: -1.0, y: -1.0, z: -1.0, color: Color::RED},
        Point3D {x: 1.0, y: -1.0, z: -1.0, color: Color::RED},
        Point3D {x: -1.0, y: 1.0, z: -1.0, color: Color::RED},
        Point3D {x: 1.0, y: 1.0, z: -1.0, color: Color::RED},
    );
    
    // Rotation angle
    let mut a = 0.0;
    let mut b = 0.0;
    let mut c = 0.0;

    while screen.window.is_open() && !screen.window.is_key_down(Key::Escape) {
        screen.clear();

        let mut cube_proj: Vec<Point2D> = vec!();

        for p in &mut cube {
            let mut p_proj: Point2D = p.rotate_x(a).rotate_y(b).rotate_z(c).project_to_2d();
            p_proj.scale(100.0).translate(WINDOW_WIDTH as f32 / 2.0, WINDOW_WIDTH as f32 / 2.0);
            cube_proj.push(p_proj);
        }

        a += 0.004;
        b += 0.005;
        c += 0.006;

        for p in &cube_proj {
            screen.draw_point(p);
        }
    
        let cube_proj_lines: Vec<Line2D> = vec!(
            Line2D {a: &cube_proj[0], b: &cube_proj[4], color: Color::RED},
            Line2D {a: &cube_proj[1], b: &cube_proj[5], color: Color::RED},
            Line2D {a: &cube_proj[2], b: &cube_proj[6], color: Color::RED},
            Line2D {a: &cube_proj[3], b: &cube_proj[7], color: Color::RED},
            
            Line2D {a: &cube_proj[4], b: &cube_proj[5], color: Color::GREEN},
            Line2D {a: &cube_proj[4], b: &cube_proj[6], color: Color::GREEN},
            Line2D {a: &cube_proj[7], b: &cube_proj[5], color: Color::GREEN},
            Line2D {a: &cube_proj[7], b: &cube_proj[6], color: Color::GREEN},

            Line2D {a: &cube_proj[0], b: &cube_proj[1], color: Color::WHITE},
            Line2D {a: &cube_proj[0], b: &cube_proj[2], color: Color::WHITE},
            Line2D {a: &cube_proj[3], b: &cube_proj[1], color: Color::WHITE},
            Line2D {a: &cube_proj[3], b: &cube_proj[2], color: Color::WHITE},
        );
        
        for l in &cube_proj_lines {
            screen.draw_line(l);
        }

        screen.refresh();
    }
}