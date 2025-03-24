using UnityEngine;

public class CameraController : MonoBehaviour
{

    private float speed = 1.0f;
    private float currentPosX;
    private Vector3 velocity = Vector3.zero;

    [SerializeField] private Transform player;
    private float aheadDistance = 2.0f;
    private float camSpeed = 0.5f;
    private float lookAhead = 5.0f;

    private void Update() {
        //camera moving inbetween rooms
        //transform.position = Vector3.SmoothDamp(transform.position, new Vector3(currentPosX, transform.position.y, transform.position.z), ref velocity, speed);
    
        //camera following player
        transform.position = new Vector3(player.position.x + lookAhead, player.position.y, transform.position.z);
        lookAhead = Mathf.Lerp(lookAhead, (aheadDistance * player.localScale.x), Time.deltaTime * camSpeed);
    }

    public void MoveToNewRoom(Transform newRoom){
        currentPosX = newRoom.position.x;
    }
}
