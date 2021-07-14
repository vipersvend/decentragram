const Decentragram = artifacts.require("./Decentragram.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Decentragram", ([deployer, author, tipper]) => {
  let decentragram;

  before(async () => {
    decentragram = await Decentragram.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await decentragram.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await decentragram.name();
      assert.equal(name, "Decentragram");
    });
  });

  describe("images", async()=>{
      let result, imageCount
      const hash = 'test hash'

    before(async() => {
      result = await decentragram.uploadImage('test hash', 'test description');
      imageCount = await decentragram.imageCount()
    })
    it('Checking Image Count', async() => {
      assert.equal(imageCount,1)
      //let image = await decentragram.images(1);
      //console.log(image);
    })

    it('Checking Returned Values', async() => {
      //result = await decentragram.uploadImage('test hash', 'test description');
      //let image = await decentragram.images(1);
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(0), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'test description', 'Dsescription is correct')

      await decentragram.uploadImage('', 'test description', {from:author}).should.be.rejected;
      await decentragram.uploadImage('test hash', '', {from:author}).should.be.rejected;

    })

    it('Checking Image Tip Functionality', async() => {
        
        let authorBalance_old;
        let authorBalance_new;
        let tipperBalance_old;
        let tipperBalance_new;
        
        

        let image_tip;
        image_tip = web3.utils.toWei('1','Ether');

        authorBalance_old = await web3.eth.getBalance(author);

        tipperBalance_old = await web3.eth.getBalance(tipper);

        const send_tip = await decentragram.tipImageOwner(1, {from: tipper, value: web3.utils.toWei('500', 'Ether') });

        tipperBalance_new = await web3.eth.getBalance(tipper);

        authorBalance_new = await web3.eth.getBalance(author);

        console.log(
          'authorBalance_old: ', web3.utils.fromWei(authorBalance_old, 'ether'), 
          'authorBalance_new: ', web3.utils.fromWei(authorBalance_new, 'ether'), 
          'tipperBalance_old: ', web3.utils.fromWei(tipperBalance_old, 'ether'), 
          'tipperBalance_new: ', web3.utils.fromWei(tipperBalance_new, 'ether')
          );


    })

  })
});
