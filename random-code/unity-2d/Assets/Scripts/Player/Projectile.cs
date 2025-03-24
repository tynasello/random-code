using UnityEngine;

public class Projectile : MonoBehaviour
{
    private float speed = 20f;
    private float direction;
    private bool hit;
    private float lifetime;

    private Animator anim;
    private BoxCollider2D boxCollider;

    private void Awake(){
        anim = GetComponent<Animator>();
        boxCollider = GetComponent<BoxCollider2D>();
    }

    //moving projectile
    private void Update(){
        if(hit) return;
        float movementSpeed = speed * Time.deltaTime * direction;
        transform.Translate(movementSpeed,0,0);

        lifetime += Time.deltaTime;
        if(lifetime > 5) gameObject.SetActive(false);
    }

    //projectile hitting another object
    private void OnTriggerEnter2D(Collider2D collision){
        hit = true;
        boxCollider.enabled = false;
        anim.SetTrigger("explode");
    }

    public void SetDirection(float dir){
        //reactivate projectile
        lifetime = 0;
        direction = dir;
        gameObject.SetActive(true);
        hit = false;
        boxCollider.enabled = true;

        //projectile sprite needs to be facing correct direction
        float localScaleX = transform.localScale.x;
        if(Mathf.Sign(localScaleX) != dir)
            localScaleX = -localScaleX;
        
        //update projectile direction
        transform.localScale = new Vector3(localScaleX, transform.localScale.y, transform.localScale.z);
    }

    //deactivate fireball once projectile explosion animation finishes
    private void Deactivate(){
        gameObject.SetActive(false);
    }
}
