using UnityEngine;

public class CollectableHeart : MonoBehaviour
{
    private float healthValue = 1.0f;
    private Health health;

    private void OnTriggerEnter2D(Collider2D collision){
        if(collision.tag == "Player"){
            health = collision.GetComponent<Health>();
            if(health.currentHealth != health.startingHealth){
                health.AddHealth(healthValue);
                gameObject.SetActive(false);
            }
        }
    }
}
