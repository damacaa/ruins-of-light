class AltarRoom extends BaseScene {
    constructor() {
        super('altarRoom');
        this.swordAltar;
        this.bowAltar;

        this.center;
        this.loading = false;
    }

    CreateStage() {


        switch (gameMode) {
            case 0:
                this.player0.x = 80;
                this.player1.x = 100;
                this.player1.visible = false;

                if (!ui.mobile) {
                    this.controls0 = this.add.sprite(this.player0.x - 30, this.player0.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);

                    this.tweens.add({
                        targets: this.controls0,
                        y: this.controls0.y - 5,
                        duration: 1500,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }

                this.camera.startFollow(this.currentPlayer, true);
                break;
            case 1:
                this.DisableSplitScreen();
                this.player0.x = 80;
                this.player1.x = 100;

                //Muestra los controles
                if (!ui.mobile) {
                    this.controls0 = this.add.sprite(this.player0.x - 30, this.player0.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);
                    this.tweens.add({
                        targets: this.controls0,
                        y: this.controls0.y - 5,
                        duration: 1500,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });

                    this.controls1 = this.add.sprite(this.player0.x + 62, this.player0.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(1).setDepth(10);
                    this.tweens.add({
                        targets: this.controls1,
                        y: this.controls1.y - 5,
                        duration: 1500,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
                break;
            case 2:
                if (isOrange) { this.player0.x = 80; } else { this.player0.x = 100; }
                if (!ui.mobile) {
                    this.controls0 = this.add.sprite(this.player0.x - 30, this.player0.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);

                    this.tweens.add({
                        targets: this.controls0,
                        y: this.controls0.y - 5,
                        duration: 1500,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
                break;
            default:
                this.player0.x = 80;
                this.player1.x = 100;
                break;
        }

        this.bg = this.add.sprite(0, -32, 'bossBackground').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);

        //Crea escenario
        this.LoadTileMap('altarRoom');

        this.bowAltar = new Altar(this, 200, 191, this.player0, this.player1, 'bowAltar', 'bow');

        this.swordAltar = new Altar(this, 288, 191, this.player0, this.player1, 'swordAltar', 'sword');

        this.bowAltar.otherAltar = this.swordAltar;
        this.swordAltar.otherAltar = this.bowAltar;



        //Crea puertas
        this.door = new SceneDoor(this, 448, 192, 'bossRoom');
        this.door.Close();

        this.sound.stopAll();
        this.musicBGAltar = this.sound.play("music", { loop: true }, { volume: 2 });

        startTime = new Date();
    }

    UpdateStage(time, delta) {
        if (!this.loading && this.bowAltar.activated && this.swordAltar.activated && this.bowAltar.player != this.swordAltar.player) {

            this.loading = true;

            this.time.delayedCall(1000, function () {
                if (this.bowAltar.activated && this.swordAltar.activated && this.bowAltar.player != this.swordAltar.player) {
                    ui.camera.flash(1000);

                    this.swordAltar.done = true;
                    this.bowAltar.done = true;

                    this.swordAltar.player.SetWeapon(1);
                    this.bowAltar.player.SetWeapon(2);

                    this.swordAltar.Deactivate();
                    this.bowAltar.Deactivate();

                    this.swordAltar.weapon.destroy();
                    this.bowAltar.weapon.destroy();

                    if (this.swordPlayer == this.player0) {
                        p0Weapon = 1;
                        p1Weapon = 2;
                    } else {
                        p0Weapon = 2;
                        p1Weapon = 1;
                    }

                    this.loading = false;

                    this.door.Open();
                } else { this.loading = false; }
            }, [], this);
        } else if (gameMode == 0) {
            if (this.swordAltar.activated && !this.bowAltar.activated) {
                this.player1.Run(Math.clamp(this.bowAltar.x - this.player1.x, -1, 1));
            } else if (!this.swordAltar.activated && this.bowAltar.activated) {
                this.player1.Run(Math.clamp(this.swordAltar.x - this.player1.x, -1, 1));
            } else {
                this.player1.Run(0);
            }
        }
    }
}

(function () { Math.clamp = function (a, b, c) { return Math.max(b, Math.min(c, a)); } })();