using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private float speed = 6.0f;
    private float jumpPower = 8.0f;
    [SerializeField] private LayerMask groundLayer;
    [SerializeField] private LayerMask wallLayer;
    private Rigidbody2D body;
    private Animator anim;
    private BoxCollider2D boxCollider;
    private float wallJumpCooldown;
    private float horizontalInput;

    private void Awake() {
        body = GetComponent<Rigidbody2D>();
        anim = GetComponent<Animator>();
        boxCollider = GetComponent<BoxCollider2D>();
    } 

    private void Update() {

        horizontalInput = Input.GetAxis("Horizontal");

        //flipping player sprite when moving
        if(horizontalInput > 0.01f) 
            transform.localScale = Vector3.one;
        else if(horizontalInput < -0.01f) 
            transform.localScale = new Vector3(-1,1,1);

        //running/walking animation
        anim.SetBool("run", horizontalInput != 0);
        //jumping animation
        anim.SetBool("grounded", isGrounded());

        if(wallJumpCooldown > 0.2f){
            
            //moving player horizontally
            body.velocity = new Vector2( horizontalInput * speed, body.velocity.y);

            if(onWall() && !isGrounded()){
                body.gravityScale = 0;
                body.velocity = Vector2.zero;
            }
            else
                body.gravityScale = 2;

            //moving player vertically (jumping)
            if(Input.GetKey(KeyCode.Space))
                Jump();
        }
        else
            wallJumpCooldown += Time.deltaTime;
    }

    //moving player vertically (jumping)
    private void Jump(){
        if(isGrounded()){
            body.velocity = new Vector2(body.velocity.x, jumpPower);
            anim.SetTrigger("jump");
        }
        //wall jumping
        else if(onWall() && !isGrounded()){
            if(horizontalInput == 0){
                body.velocity = new Vector2(-Mathf.Sign(transform.localScale.x) * 10, 0);
                transform.localScale = new Vector3(-Mathf.Sign(transform.localScale.x), transform.localScale.y, transform.localScale.z);
            }
            else    
                body.velocity = new Vector2(-Mathf.Sign(transform.localScale.x) * 3, 6);

            wallJumpCooldown = 0;
        }
    }

    //find if player is grounded
    private bool isGrounded(){
        RaycastHit2D raycastHit = Physics2D.BoxCast(boxCollider.bounds.center, boxCollider.bounds.size, 0, Vector2.down, 0.1f, groundLayer);
        return raycastHit.collider != null;
    }

    //wall jumping
    private bool onWall(){
        RaycastHit2D raycastHit = Physics2D.BoxCast(boxCollider.bounds.center, boxCollider.bounds.size, 0, new Vector2(transform.localScale.x,0), 0.1f, wallLayer);
        return raycastHit.collider != null;
    }

    //player attacking
    public bool canAttack(){
        // -- player can attack when not moving, grounded, and not on wall
        return horizontalInput == 0 && isGrounded() && !onWall();
    }
}
