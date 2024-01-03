-- USE THIS TO CLEAN OUT YOUR DATABASE
DROP TABLE IF EXISTS map_vault_keep;
DROP TABLE IF EXISTS vault;
DROP TABLE IF EXISTS keep;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id VARCHAR(255) NOT NULL,
    user_username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_color VARCHAR(12) DEFAULT "",
    user_img_url VARCHAR(255) DEFAULT "",
    user_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE KEY user_email (user_email)
);

CREATE TABLE vault (
    vault_id int NOT NULL AUTO_INCREMENT,
    vault_name VARCHAR(255) NOT NULL,
    vault_description VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    INDEX user_id (user_id),
    FOREIGN KEY (user_id)
        REFERENCES user(user_id)
			ON DELETE CASCADE,  
    PRIMARY KEY (vault_id)
);

CREATE TABLE `keep` (
    keep_id int NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255),
    keep_name VARCHAR(255) NOT NULL,
    keep_description VARCHAR(255) NOT NULL,
    keep_img_url VARCHAR(255),
    keep_is_public TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    keep_view_count INT NOT NULL DEFAULT 0,
    keep_share_count INT NOT NULL DEFAULT 0,
    keep_keep_count INT NOT NULL DEFAULT 0,
    INDEX user_id (user_id),
    FOREIGN KEY (user_id)
        REFERENCES user(user_id)
			ON DELETE CASCADE,  
    PRIMARY KEY (keep_id)
);

CREATE TABLE map_vault_keep (
    map_vault_keep_id int NOT NULL AUTO_INCREMENT,
    vault_id int NOT NULL,
    keep_id int NOT NULL,
    user_id VARCHAR(255) NOT NULL,

    PRIMARY KEY (map_vault_keep_id),
    INDEX (vault_id, keep_id),
    INDEX (user_id),

    FOREIGN KEY (user_id)
        REFERENCES user(user_id)
			ON DELETE CASCADE,

    FOREIGN KEY (vault_id)
        REFERENCES vault(vault_id)
			ON DELETE CASCADE,

    FOREIGN KEY (keep_id)
        REFERENCES keep(keep_id)
			ON DELETE CASCADE
);


-- -- USE THIS LINE FOR GET KEEPS BY VAULTID
-- SELECT * FROM map_vault_keep vk
-- INNER JOIN keeps k ON k.keep_id = vk.keep_id 
-- WHERE (vault_id = @vault_id AND vk.user_id = @user_id) 




