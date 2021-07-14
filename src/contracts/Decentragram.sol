pragma solidity ^0.5.0;

contract Decentragram {
  // Code goes here...
  string public name = "Decentragram";
  mapping(uint => Image) public images;
  
  uint public imageCount = 0;

  struct Image{
  	uint id;
  	string hash;
  	string description;
  	uint tipAmount;
  	address payable author;
  }

  event ImageCreated(
  	uint id,
  	string hash,
  	string description,
  	uint tipAmount,
  	address payable author
  	);
  function uploadImage(string memory _imgHash, string memory _description) public {
  	
  	require(bytes(_imgHash).length > 0);

  	require(bytes(_description).length>0);

  	require(msg.sender != address(0x0));

  	imageCount +=1;

  	images[1] = Image(imageCount, _imgHash, _description, 0, msg.sender);

  	emit ImageCreated(imageCount, _imgHash, _description, 0,msg.sender );
  }

  event ImageTipped(  	
  	uint id,
  	string hash,
  	string description,
  	uint tipAmount,
  	address payable author);

  function tipImageOwner(uint _id) public payable {

  	require(_id >0 && _id <= imageCount);
  	Image memory _image = images[_id];

  	address payable _author =_image.author;

  	address(_author).transfer(msg.value);

  	_image.tipAmount = _image.tipAmount + msg.value;

  	images[_id] = _image;

  	emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);

  }

  //Store Posts

  // Create Posts

  // Tip Posts
}