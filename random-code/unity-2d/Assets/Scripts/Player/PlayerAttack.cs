using UnityEngine;

public class PlayerAttack : MonoBehaviour
{
    private float attackCooldown = 0.3f;
    [SerializeField] private Transform firePoint;
    [SerializeField] private GameObject[] fireballs;
    private Animator anim;
    private PlayerMovement playerMovement;
    private float cooldownTimer = Mathf.Infinity;

    private void Awake(){
        anim = GetComponent<Animator>();
        playerMovement = GetComponent<PlayerMovement>();
    }

    private void Update(){
        if(Input.GetMouseButton(0) && cooldownTimer > attackCooldown && playerMovement.canAttack())
            Attack();
        cooldownTimer += Time.deltaTime;
    }

    private void Attack(){

        anim.SetTrigger("attack");
        cooldownTimer = 0;

        fireballs[FindFireball()].transform.position = firePoint.position;
        fireballs[FindFireball()].GetComponent<Projectile>().SetDirection(Mathf.Sign(transform.localScale.x));
    }

    //find inactive projectiles
    private int FindFireball(){
        for (int i = 0; i < fireballs.Length; i++){
            if(!fireballs[i].activeInHierarchy)
                return i;
        }
        return 0;
    }
}
