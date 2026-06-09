rem
rem Compose types.ts file in parent directory
rem

@echo off

cd ..
if exist types.ts del types.ts
cd types

for %%f in (*.ts) do (
	echo export * from './types/%%~nf' >> ../types.ts
)