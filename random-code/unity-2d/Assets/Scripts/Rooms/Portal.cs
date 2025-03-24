using UnityEngine;

public class Portal : MonoBehaviour
{
    [SerializeField] private Transform previousRoom;
    [SerializeField] private Transform nextRoom;
    [SerializeField] private CameraController cam;
    
    //if player collides with portal, make camera move to the next room
    private void OnTriggerEnter2D(Collider2D collision) {
        if(collision.tag == "Player"){
            if(collision.transform.position.x < transform.position.x)
                cam.MoveToNewRoom(nextRoom);
            else
                cam.MoveToNewRoom(previousRoom);
        }
    }

}