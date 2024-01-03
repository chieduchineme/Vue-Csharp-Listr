delimiter ;;
drop procedure if exists AddKeepToVault; ;;
create procedure AddKeepToVault(KeepId int, VaultId int, UserId varchar(255))
begin
	declare addKeep tinyint(1) unsigned;
    
    set addKeep = (
		select
			count(*) = 0
		from
			map_vault_keep
		where
			vault_id = VaultId
            and
            keep_id = KeepId
	);
    
    if addKeep then
		insert into map_vault_keep
			(vault_id, keep_id, user_id)
		values
			(VaultId, KeepId, UserId);
            
		update
			keep
		set
			keep_keep_count = keep_keep_count + 1
		where
			keep_id = KeepId;			
    end if;
    
    select * from keep where keep_id = KeepId;
end; ;;
delimiter ;