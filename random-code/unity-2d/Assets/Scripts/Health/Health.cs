using UnityEngine;
using System.Collections;

public class Health : MonoBehaviour
{
    
    public float startingHealth{get; private set;} = 3.0f;
    public float currentHealth {get; private set;}
    private bool dead;
    private Animator anim;

    private float safeDuration = 1.0f;
    private int numFlashes = 3;
    private SpriteRenderer spriteRenderer;

    private void Awake() {
        currentHealth = startingHealth;
        anim = GetComponent<Animator>();
        spriteRenderer = GetComponent<SpriteRenderer>();
    }

    public void TakeDamage(float damage){

        //restrict currentHealth to be inbetween 0 and startingHealth
        currentHealth = Mathf.Clamp(currentHealth - damage, 0, startingHealth);
        //player takes damage
        if(currentHealth>0){
            anim.SetTrigger("hurt");
            StartCoroutine(Safe());
        }
        //player is dead
        else{
            if(!dead){
                anim.SetTrigger("die");
                GetComponent<PlayerMovement>().enabled = false;
                dead = true;
            }
        }
    }

    //add health to player
    public void AddHealth(float incrementValue){
        currentHealth = Mathf.Clamp(currentHealth + incrementValue, 0, startingHealth);
    }

    //ran once player takes damage. they are safe from taking further damage for a short period of time
    //player and enemy are on layers 10 and 11
    private IEnumerator Safe(){
        Physics2D.IgnoreLayerCollision(10,11,true);
        //player is now safe
        for (int i = 0; i < numFlashes; i++){
            spriteRenderer.color = new Color(1,0,0,0.5f);
            yield return new WaitForSeconds(safeDuration/numFlashes);
            spriteRenderer.color = Color.white;
            yield return new WaitForSeconds(safeDuration/numFlashes);
        }
        //player is now vulnerable
        Physics2D.IgnoreLayerCollision(10,11,false);
    }

}
